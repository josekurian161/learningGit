import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashboardFilter'
})
export class DashboardFilterPipe implements PipeTransform {

  transform(value: any[], args?: any): any[] {
    
    var output: any[] = [];
    if(value)
    {
      for (var i = 0; i < value.length; i++) {
        if (value[i].b_IsDashboard === true) {
          output.push(value[i]);
        }
      }
      return output;
    }
    else
    return null;
   

  }

}
