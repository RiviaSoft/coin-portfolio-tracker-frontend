import { Pipe, PipeTransform } from '@angular/core';
import { ArchivedOperationModel } from '../models/archivedOperationModel';

@Pipe({
  name: 'archivedOperationFilter'
})
export class ArchivedOperationFilterPipe implements PipeTransform {

  transform(value: ArchivedOperationModel[], filterText: string): ArchivedOperationModel[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (o: ArchivedOperationModel) =>
            o.coinsymbol.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }

}
