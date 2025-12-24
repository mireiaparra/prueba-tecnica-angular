import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import Aura from '@primeuix/themes/aura';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockAuthInterceptor } from './core/mock-auth.interceptor';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';
import { MyPreset } from './mypreset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
 		providePrimeNG({
			theme: {
					preset: MyPreset,
					options: {
						darkModeSelector: false || 'none'
					},
			},
			translation: {
				"startsWith": "Comienza con",
				"contains": "Contiene",
				"notContains": "No contiene",
				"endsWith": "Termina con",
				"equals": "Igual",
				"notEquals": "No igual",
				"noFilter": "No filtrar",
				"lt": "Menor que",
				"lte": "Menor o igual a",
				"gt": "Mayor que",
				"gte": "Mayor o igual a",
				"is": "Es",
				"isNot": "No es",
				"before": "Antes",
				"after": "Despues",
				"dateIs": "La fecha es",
				"dateIsNot": "La fecha no es",
				"dateBefore": "La fecha es anterior",
				"dateAfter": "La fecha es despues",
				"clear": "Limpiar",
				"apply": "Aplicar",
				"matchAll": "Coincidir con todos",
				"matchAny": "Coincidir con cualquiera",
				"addRule": "Adicionar regla",
				"removeRule": "Eliminar regla",
				"accept": "Aceptar",
				"reject": "Cancelar",
				"choose": "Seleccionar",
				"noFileChosenMessage": "Ningún archivo seleccionado",
				"upload": "Subir",
				"cancel": "Cancelar",
				"dayNames": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
				"dayNamesShort": ["Dom", "Lun", "Mar", "Mier", "Jue", "Vie", "Sab"],
				"dayNamesMin": ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
				"monthNames": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", " Diciembre"],
				"monthNamesShort": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
				"dateFormat": "dd/mm/yy",
				"today": "Hoy",
				"weekHeader": "Semana",
				"weak": "Débil",
				"medium": "Medio",
				"strong": "Fuerte",
				"passwordPrompt": "Ingrese una contraseña",
				"emptyMessage": "No se encontraron resultados",
				"emptyFilterMessage": "No se encontraron resultados"
			}
		}),
    provideAnimations(),
		MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: MockAuthInterceptor, multi: true },
  ],
};
