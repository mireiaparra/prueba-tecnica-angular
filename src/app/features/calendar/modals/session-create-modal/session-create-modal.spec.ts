import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCreateModal } from './session-create-modal';

describe('SessionCreateModal', () => {
  let component: SessionCreateModal;
  let fixture: ComponentFixture<SessionCreateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionCreateModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionCreateModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
