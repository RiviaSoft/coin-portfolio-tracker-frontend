import { Pipe, PipeTransform } from '@angular/core';
import { RecentOperationModel } from '../models/recentOperationModel';

@Pipe({
  name: 'recentOperationFilter'
})
export class RecentOperationFilterPipe implements PipeTransform {

  transform(value: RecentOperationModel[], filterText: string): RecentOperationModel[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (o: RecentOperationModel) =>
            o.coinsymbol.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }

}
