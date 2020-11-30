import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter): any {
    console.log('filter text', filter);
  
    return filter 
        ? items.filter(item => item.name.indexOf(filter) !== -1)
        : items;
}

}
