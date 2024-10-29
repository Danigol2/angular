import { Injectable } from '@angular/core';
import { task } from '../components/model/task';

@Injectable({
  providedIn: 'root'
})
export class LocalDBService {

  //Devuelve el array de local storage o array vacio si no existe
  load():task[]{
    let tasks=localStorage.getItem('tasks');
    if(tasks){
      return JSON.parse(tasks);
    }else{
      return [];
    }
  }
  /* *Método que guarda el array de tareas en local storage*/
  save(tasks:task[]){
    localStorage.setItem('tasks',JSON.stringify(tasks)) //setItem guarda algo
  }
}
