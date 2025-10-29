type GTagCommand = 'config' | 'event' | 'set';

interface AnalyticsConfig {
  measurementId: string;
  enabled: boolean;
}

class GoogleAnalytics {
  private config: AnalyticsConfig | null = null;
  initialize(measurementId: string, enabled: boolean = true): void {
    this.config = { measurementId, enabled };

    if (!enabled) {
      console.log('[Analytics] Disabled in current environment');
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    this.loadScript(measurementId);
  }

  trackPageView(url?: string): void {
    if (!this.isEnabled()) return;

    const pageUrl = url || window.location.pathname + window.location.search;

    this.gtag('config', this.config!.measurementId, {
      page_path: pageUrl,
    });
  }

  trackEvent(eventName: string, params?: Record<string, unknown>): void {
    if (!this.isEnabled()) return;

    this.gtag('event', eventName, params);
  }
  setUserProperties(properties: Record<string, unknown>): void {
    if (!this.isEnabled()) return;

    this.gtag('set', 'user_properties', properties);
  }

  private isEnabled(): boolean {
    return this.config?.enabled ?? false;
  }

  private loadScript(measurementId: string): void {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    this.gtag('js', new Date());
    this.gtag('config', measurementId);
  }

  private gtag(command: GTagCommand | 'js', ...args: unknown[]): void {
    if (typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }
}

export const analytics = new GoogleAnalytics();