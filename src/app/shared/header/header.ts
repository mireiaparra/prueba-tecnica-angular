import { Component, inject, effect, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { Router, RouterLink } from '@angular/router';

type LocalMenuItem = { label: string; icon?: string; action: () => void; url?: string };

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeUserMenu();
    }
  }

  private auth = inject(AuthService);
  private router = inject(Router);
  private el = inject(ElementRef);

  public menuItems: LocalMenuItem[] = [];
  public userItems: LocalMenuItem[] = [];
  public usernameLabel = 'Cuenta';
  public userMenuOpen = false;

  constructor() {
    effect(() => {
      const auth = this.auth.isAuthenticated();
      this._buildMenu(!!auth);
    });
  }

  private _buildMenu(authenticated: boolean) {
    if (!authenticated) {
      this.menuItems = [];
      this.userItems = [];
      this.usernameLabel = 'Cuenta';
      return;
    }

    const email = this.auth.getUserEmail();
    const role = this.auth.getRole();

    const menu: LocalMenuItem[] = [
      {
        label: 'Calendario',
        icon: 'pi pi-calendar',
        action: () => this.router.navigate(['/calendar']),
      },
    ];

    if (role === 'admin') {
      menu.push({
        label: 'Administrador',
        icon: 'pi pi-user-cog',
        action: () => this.router.navigate(['/admin']),
      });
    }

    this.menuItems = menu;
    this.usernameLabel = email ?? 'Cuenta';
    this.userItems = [
      { label: 'Cerrar sesión', icon: 'pi pi-sign-out', action: () => this._logout() },
    ];
  }

  public toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  public closeUserMenu() {
    this.userMenuOpen = false;
  }

  private _logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
