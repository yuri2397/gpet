import {
  Injectable,
  InjectionToken,
  Injector,
  Type,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ModalComponent } from '../ui/modal/modal.component';
import { ConfirmDialogComponent } from '../ui/confirm-dialog/confirm-dialog.component';

export const MODAL_DATA = new InjectionToken<any>('MODAL_DATA');

export class ModalRef<T = any> {
  private _afterClose$ = new Subject<T | null>();
  afterClose: Observable<T | null> = this._afterClose$.asObservable();
  private _destroy: (() => void) | null = null;

  /** @internal */
  _setDestroyFn(fn: () => void) {
    this._destroy = fn;
  }

  /** Alias for afterClose (backwards compat) */
  get afterClosed$(): Observable<T | null> {
    return this.afterClose;
  }

  destroy(data?: T): void {
    this._afterClose$.next(data ?? null);
    this._afterClose$.complete();
    this._destroy?.();
  }

  /** Alias for destroy */
  close(data?: T): void {
    this.destroy(data);
  }
}

export interface ModalConfig {
  title: string;
  component: Type<any>;
  data?: Record<string, any>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ConfirmConfig {
  title: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  okDanger?: boolean;
  onOk?: () => void | Observable<any> | Promise<any>;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private appRef = inject(ApplicationRef);
  private envInjector = inject(EnvironmentInjector);
  private injector = inject(Injector);

  open<T = any>(config: ModalConfig): ModalRef<T> {
    const modalRef = new ModalRef<T>();

    const childInjector = Injector.create({
      providers: [
        { provide: MODAL_DATA, useValue: config.data ?? {} },
        { provide: ModalRef, useValue: modalRef },
      ],
      parent: this.injector,
    });

    const modalComponentRef = createComponent(ModalComponent, {
      environmentInjector: this.envInjector,
      elementInjector: childInjector,
    });

    modalComponentRef.instance.title.set(config.title);
    modalComponentRef.instance.size.set(config.size ?? 'md');
    modalComponentRef.instance.contentComponent.set(config.component);
    modalComponentRef.instance.contentInjector.set(childInjector);

    modalComponentRef.instance.close.subscribe(() => {
      modalRef.destroy(undefined as any);
    });

    document.body.appendChild(modalComponentRef.location.nativeElement);
    this.appRef.attachView(modalComponentRef.hostView);

    modalRef._setDestroyFn(() => {
      modalComponentRef.instance.animateOut().then(() => {
        this.appRef.detachView(modalComponentRef.hostView);
        modalComponentRef.destroy();
      });
    });

    requestAnimationFrame(() => {
      modalComponentRef.instance.visible.set(true);
    });

    return modalRef;
  }

  confirm(config: ConfirmConfig): ModalRef<boolean> {
    const modalRef = new ModalRef<boolean>();

    const childInjector = Injector.create({
      providers: [
        { provide: ModalRef, useValue: modalRef },
      ],
      parent: this.injector,
    });

    const modalComponentRef = createComponent(ModalComponent, {
      environmentInjector: this.envInjector,
      elementInjector: childInjector,
    });

    modalComponentRef.instance.title.set(config.title);
    modalComponentRef.instance.size.set('sm');
    modalComponentRef.instance.contentComponent.set(ConfirmDialogComponent);
    modalComponentRef.instance.showCloseButton.set(false);

    const confirmInjector = Injector.create({
      providers: [
        { provide: ModalRef, useValue: modalRef },
        {
          provide: MODAL_DATA,
          useValue: {
            content: config.content ?? '',
            okText: config.okText ?? 'Confirmer',
            cancelText: config.cancelText ?? 'Annuler',
            okDanger: config.okDanger ?? false,
            onOk: config.onOk,
          },
        },
      ],
      parent: this.injector,
    });

    modalComponentRef.instance.contentInjector.set(confirmInjector);

    modalComponentRef.instance.close.subscribe(() => {
      modalRef.destroy(false);
    });

    document.body.appendChild(modalComponentRef.location.nativeElement);
    this.appRef.attachView(modalComponentRef.hostView);

    modalRef._setDestroyFn(() => {
      modalComponentRef.instance.animateOut().then(() => {
        this.appRef.detachView(modalComponentRef.hostView);
        modalComponentRef.destroy();
      });
    });

    requestAnimationFrame(() => {
      modalComponentRef.instance.visible.set(true);
    });

    return modalRef;
  }
}
