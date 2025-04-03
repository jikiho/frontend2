/**
 * Převod hodnoty na JSON bez duplicit a zacyklení.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'jsoner'
})
export class JsonerPipe implements PipeTransform {
    transform(value: any, space?: string | number): string {
        return JsonerPipe.stringify(value, space);
    }

    static  stringify(obj?: any, space: string | number = 4): string {
        const values = new Map(),
            parents: any[] = [],
            keys: (string | number)[] = [];

        return JSON.stringify(obj, function(index, value) {
            if (value && typeof value == 'object') {
                const parent = this,
                    key = Array.isArray(parent) ? parseInt(index) : index;

                if (!parents.length) {
                    ; //root
                }
                else if (parent === parents.slice(-1)[0]) {
                    ; //sibling
                }
                else {
                    while (parents.length > 1 && parent !== parents.slice(-1)[0]) {
                        parents.pop();
                        keys.pop();
                    }
                }

                if (values.has(value)) {
                    return '...';
                }

                parents.push(value);
                keys.push(key);

                values.set(value, [...keys]);
            }

            return value;
        }, space);
    }
}
