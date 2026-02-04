import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin, TextPlugin, Flip } from 'gsap/all';

/**
 * 🎬 GsapAnimationService
 * 
 * Servicio centralizado para gestionar todas las animaciones GSAP en la aplicación.
 * Proporciona helpers y utilidades reutilizables para animaciones complejas.
 * 
 * Características:
 * - Registro automático de plugins GSAP (ScrollTrigger, ScrollTo, Text, Flip)
 * - Helpers para animaciones comunes (fade, slide, scale, etc.)
 * - Factory methods para Timelines
 * - Utilities para ScrollTrigger
 * - Animaciones de entrada/salida
 * - Efecto parallax
 * - Contador animado
 * - Efecto de tipeo (Typewriter)
 * - Navegación suave (ScrollTo)
 * - Transiciones de layout (Flip)
 * - SSR safe (verifica si está en browser)
 * 
 * @author SoyTuTaxi Team
 * @version 2.1
 */

export interface AnimationConfig {
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number | object;
}

export interface ScrollTriggerConfig {
  trigger: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class GsapAnimationService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser: boolean;

  // ==================== CONSTANTS ====================

  /**
   * Configuraciones de easing predefinidas (premium smooth animations)
   */
  public readonly EASING = {
    power1: 'power1.out',
    power2: 'power2.out',
    power3: 'power3.out',
    power4: 'power4.out',
    elastic: 'elastic.out(1, 0.5)',
    back: 'back.out(1.7)',
    bounce: 'bounce.out',
    expo: 'expo.out',
    circ: 'circ.out',
    sine: 'sine.inOut',
    smooth: 'power2.inOut',
    entrance: 'power3.out', // Standard entry easing
    exit: 'power3.in'       // Standard exit easing
  } as const;

  /**
   * Duraciones estándar para consistencia
   */
  public readonly DURATION = {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    verySlow: 1.2
  } as const;

  /**
   * Configuración por defecto para animaciones
   */
  private readonly DEFAULT_CONFIG: AnimationConfig = {
    duration: this.DURATION.normal,
    ease: this.EASING.power3,
    delay: 0
  };

  // ==================== INITIALIZATION ====================

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.registerPlugins();
      this.configureDefaults();
      console.log('🎬 GsapAnimationService initialized');
    }
  }

  /**
   * Registra plugins de GSAP
   */
  private registerPlugins(): void {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, Flip);
    console.log('✅ GSAP plugins registered: ScrollTrigger, ScrollTo, Text, Flip');
  }

  /**
   * Configura valores por defecto de GSAP
   */
  private configureDefaults(): void {
    gsap.defaults({
      ease: this.EASING.power3,
      duration: this.DURATION.normal
    });
  }

  // ==================== CORE METHODS ====================

  /**
   * Retorna la instancia de GSAP
   * @returns gsap instance
   */
  public getGsap() {
    return gsap;
  }

  /**
   * Proxy para gsap.from()
   */
  public from(target: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;
    return gsap.from(target, vars);
  }

  /**
   * Proxy para gsap.to()
   */
  public to(target: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;
    return gsap.to(target, vars);
  }

  /**
   * Proxy para gsap.fromTo()
   */
  public fromTo(target: gsap.TweenTarget, fromVars: gsap.TweenVars, toVars: gsap.TweenVars): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;
    return gsap.fromTo(target, fromVars, toVars);
  }

  /**
   * Retorna la instancia de ScrollTrigger
   * @returns ScrollTrigger instance
   */
  public getScrollTrigger() {
    return ScrollTrigger;
  }

  /**
   * Retorna la instancia de Flip
   * @returns Flip instance
   */
  public getFlip() {
    return Flip;
  }

  /**
   * Verifica si está corriendo en browser (SSR safe)
   */
  public isInBrowser(): boolean {
    return this.isBrowser;
  }

  // ==================== TIMELINE FACTORIES ====================

  /**
   * Crea un timeline con configuración base
   * @param config - Configuración opcional del timeline
   * @returns gsap.core.Timeline
   */
  public createTimeline(config?: gsap.TimelineVars): gsap.core.Timeline {
    if (!this.isBrowser) return {} as gsap.core.Timeline;

    return gsap.timeline({
      defaults: { ease: this.EASING.power3 },
      ...config
    });
  }

  /**
   * Crea un timeline con ScrollTrigger integrado
   * @param scrollConfig - Configuración de ScrollTrigger
   * @param timelineConfig - Configuración adicional del timeline
   * @returns gsap.core.Timeline
   */
  public createScrollTimeline(
    scrollConfig: ScrollTriggerConfig,
    timelineConfig?: gsap.TimelineVars
  ): gsap.core.Timeline {
    if (!this.isBrowser) return {} as gsap.core.Timeline;

    return gsap.timeline({
      defaults: { ease: this.EASING.power3 },
      scrollTrigger: scrollConfig,
      ...timelineConfig
    });
  }

  // ==================== FADE ANIMATIONS ====================

  /**
   * Fade In animation
   * @param target - Selector o elemento
   * @param config - Configuración de animación
   * @returns gsap.core.Tween
   */
  public fadeIn(target: gsap.TweenTarget, config?: AnimationConfig): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;

    return gsap.fromTo(
      target,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        ...this.DEFAULT_CONFIG,
        ...config
      }
    );
  }

  /**
   * Fade Out animation
   * @param target - Selector o elemento
   * @param config - Configuración de animación
   * @returns gsap.core.Tween
   */
  public fadeOut(target: gsap.TweenTarget, config?: AnimationConfig): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;

    return gsap.to(target, {
      opacity: 0,
      y: -30,
      ...this.DEFAULT_CONFIG,
      ...config
    });
  }

  // ==================== SLIDE ANIMATIONS ====================

  /**
   * Slide in desde la izquierda
   * @param target - Selector o elemento
   * @param config - Configuración de animación
   * @returns gsap.core.Tween
   */
  public slideInLeft(target: gsap.TweenTarget, config?: AnimationConfig): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;

    return gsap.fromTo(
      target,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        ...this.DEFAULT_CONFIG,
        ...config
      }
    );
  }

  /**
   * Slide in desde la derecha
   * @param target - Selector o elemento
   * @param config - Configuración de animación
   * @returns gsap.core.Tween
   */
  public slideInRight(target: gsap.TweenTarget, config?: AnimationConfig): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;

    return gsap.fromTo(
      target,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        ...this.DEFAULT_CONFIG,
        ...config
      }
    );
  }

  /**
   * Slide up desde abajo
   * @param target - Selector o elemento
   * @param config - Configuración de animación
   * @returns gsap.core.Tween
   */
  public slideUp(target: gsap.TweenTarget, config?: AnimationConfig): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;

    return gsap.fromTo(
      target,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ...this.DEFAULT_CONFIG,
        ...config
      }
    );
  }

  // ==================== SCALE ANIMATIONS ====================

  /**
   * Scale in con efecto bounce
   * @param target - Selector o elemento
   * @param config - Configuración de animación
   * @returns gsap.core.Tween
   */
  public scaleIn(target: gsap.TweenTarget, config?: AnimationConfig): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;

    return gsap.fromTo(
      target,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: this.EASING.back,
        ...this.DEFAULT_CONFIG,
        ...config
      }
    );
  }

  /**
   * Scale out
   * @param target - Selector o elemento
   * @param config - Configuración de animación
   * @returns gsap.core.Tween
   */
  public scaleOut(target: gsap.TweenTarget, config?: AnimationConfig): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;

    return gsap.to(target, {
      scale: 0,
      opacity: 0,
      ...this.DEFAULT_CONFIG,
      ...config
    });
  }

  // ==================== STAGGER ANIMATIONS ====================

  /**
   * Anima múltiples elementos con stagger (uno tras otro)
   * @param targets - Selector o elementos
   * @param config - Configuración de animación con stagger
   * @returns gsap.core.Tween
   */
  public staggerFadeIn(
    targets: gsap.TweenTarget,
    config?: AnimationConfig
  ): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;

    return gsap.fromTo(
      targets,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        ...this.DEFAULT_CONFIG,
        ...config
      }
    );
  }

  // ==================== SCROLL TRIGGER UTILITIES ====================

  /**
   * Crea un ScrollTrigger simple
   * @param config - Configuración de ScrollTrigger
   * @returns ScrollTrigger instance
   */
  public createScrollTrigger(config: ScrollTriggerConfig) {
    if (!this.isBrowser) return null;

    return ScrollTrigger.create(config);
  }

  /**
   * Refresh de ScrollTrigger
   * Útil después de cambios en el DOM
   */
  public refreshScrollTrigger(): void {
    if (!this.isBrowser) return;

    ScrollTrigger.refresh();
  }

  /**
   * Mata todos los ScrollTriggers
   * Útil en ngOnDestroy
   */
  public killAllScrollTriggers(): void {
    if (!this.isBrowser) return;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  // ==================== PARALLAX ====================

  /**
   * Crea efecto parallax en un elemento
   * @param target - Selector CSS o elemento DOM
   * @param speed - Velocidad del parallax (0-1, menor = más lento)
   * @param trigger - Selector CSS o elemento DOM para trigger (opcional)
   * @returns gsap.core.Tween
   */
  public parallax(
    target: string | Element,
    speed: number = 0.5,
    trigger?: string | Element
  ): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;

    return gsap.to(target, {
      yPercent: 30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger || target,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // ==================== COUNTER ANIMATION ====================

  /**
   * Anima un contador numérico
   * @param target - Elemento que contiene el número
   * @param endValue - Valor final del contador
   * @param config - Configuración de animación
   * @returns gsap.core.Tween
   */
  public animateCounter(
    target: HTMLElement,
    endValue: number,
    config?: AnimationConfig
  ): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;

    const obj = { value: 0 };

    return gsap.to(obj, {
      value: endValue,
      duration: config?.duration || 2,
      ease: this.EASING.power2,
      onUpdate: () => {
        target.textContent = Math.round(obj.value).toLocaleString('es-AR');
      },
      ...config
    });
  }

  // ==================== TEXT & TYPEWRITER ====================

  /**
   * Anima texto como máquina de escribir o reemplazo
   * @param target - Elemento destino
   * @param text - Texto nuevo
   * @param duration - Duración (opcional)
   */
  public typeText(target: gsap.TweenTarget, text: string, duration: number = 1): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;

    return gsap.to(target, {
      text: {
        value: text,
        delimiter: ""
      },
      duration: duration,
      ease: 'none'
    });
  }

  // ==================== SCROLL TO ====================

  /**
   * Scroll suave a un elemento o posición
   * @param target - Selector, elemento o número
   * @param offsetY - Offset vertical (para headers fijos)
   */
  public scrollTo(target: string | number | Element, offsetY: number = 80): gsap.core.Tween {
    if (!this.isBrowser) return {} as gsap.core.Tween;

    return gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: target,
        offsetY: offsetY
      },
      ease: this.EASING.power3
    });
  }

  // ==================== UTILITIES ====================

  /**
   * Mata una animación específica
   * @param target - Selector o elemento
   */
  public kill(target: gsap.TweenTarget): void {
    if (!this.isBrowser) return;

    gsap.killTweensOf(target);
  }

  /**
   * Establece propiedades de un elemento sin animar
   * @param target - Selector o elemento
   * @param vars - Propiedades a establecer
   */
  public set(target: gsap.TweenTarget, vars: gsap.TweenVars): void {
    if (!this.isBrowser) return;

    gsap.set(target, vars);
  }

  /**
   * Limpia todo (animaciones + ScrollTriggers)
   * Útil en ngOnDestroy de componentes
   */
  public cleanup(): void {
    if (!this.isBrowser) return;

    this.killAllScrollTriggers();
  }
}
