// carrito.observable.ts
export type Observer<T> = (data: T) => void;

export class CarritoObservable<T = any> {
  private observers: Observer<T>[] = [];

  subscribe(fn: Observer<T>) {
    this.observers.push(fn);
  }

  unsubscribe(fn: Observer<T>) {
    this.observers = this.observers.filter(observer => observer !== fn);
  }

  notify(data: T) {
    for (const observer of this.observers) {
      observer(data);
    }
  }
}

// 👉 Exportamos una instancia global que pueden usar otros módulos
export const carritoObservable = new CarritoObservable();
