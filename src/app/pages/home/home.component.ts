import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { task } from '../../components/model/task';
import { timeInterval, timestamp } from 'rxjs';
import { CreateTaskComponent } from "../../components/create-task/create-task.component";
import { LocalDBService } from '../../services/local-db.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CreateTaskComponent,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  db=inject(LocalDBService);  //Inyecto el servicio insertandolo en una variable

  todo:task[]=[];

  ngOnInit(){
    this.todo=this.db.load();
  }

  addTask(newTask:task){
    this.todo.push(newTask);
    this.db.save(this.todo);
  }

  removeTask(id:number|undefined){
    if (!id) return;  //Si no me pasas numero y fuese undefined me salgo de la funcion
    if (!confirm("¿Está seguro?")) return;  //Si pulsa false me salgo
    this.todo=this.todo.filter(t=>t.id!=id);
    this.db.save(this.todo);
  }

  // editTask(task: task) {
  //   const nuevoTitulo = prompt('Editar tarea:', task.title);
  //   if (nuevoTitulo !== null) {
  //       task.title = nuevoTitulo;
  //   }
  // } 

  editTask(task:task){
    task.newTitle=task.title;
    task.update=true;
  }

  updateTask(task:task){
    task.title=task.newTitle as any;
    task.newTitle=undefined;
    task.update=undefined;
    this.db.save(this.todo);
  }

  cancelEdit(task:task){
    task.update=undefined;
    task.newTitle=undefined;
  }
}
