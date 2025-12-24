import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { SessionCreateModal } from '../calendar/modals/session-create-modal/session-create-modal';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss'],
  providers: [DialogService],
})
export class Admin {
  private dialog = inject(DialogService);
  private auth = inject(AuthService);

  public username = this.auth.getUserEmail() ?? 'Usuario';

  public openCreateTask() {
    const ref = this.dialog.open(SessionCreateModal, {
      header: 'Crear tarea',
      closable: true,
      data: {},
    });

  }
}
