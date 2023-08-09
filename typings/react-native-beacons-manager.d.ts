import {DeviceEventEmitterStatic} from 'react-native'

declare module 'react-native-beacons-manager' {

  export interface BeaconRegion {
    identifier: string,
    uuid: string,
    minor?: number,
    major?: number
  }

  export interface NotificationData  {
    channelId: string,
    notificationId: number,
    contentTitle: string,
    contentMessage: string,
    drawableIcon: string,
    showWhen: boolean,
    priority?: string,
    visibility?: string,
  }

  export type AuthorizationStatus =
    | 'authorizedAlways'
    | 'authorizedWhenInUse'
    | 'denied'
    | 'notDetermined'
    | 'restricted';

  class Beacons {
    ///////////////////////////////////////////////////////
    // iOS only
    ///////////////////////////////////////////////////////

    requestAlwaysAuthorization(): void;

    requestWhenInUseAuthorization(): void;

    allowsBackgroundLocationUpdates(
      allow: boolean
    ): void;

    getAuthorizationStatus(
      callback: (status: AuthorizationStatus) => any
    ): any;

    startUpdatingLocation(): void;

    stopUpdatingLocation(): void;

    shouldDropEmptyRanges(
      drop: boolean
    ): void;

    ///////////////////////////////////////////////////////
    // android only
    ///////////////////////////////////////////////////////
    ARMA_RSSI_FILTER: string;
    RUNNING_AVG_RSSI_FILTER: string;
    PARSER_IBEACON: string;
    PARSER_ESTIMOTE: string;
    PARSER_ALTBEACON: string;
    PARSER_EDDYSTONE_TLM: string;
    PARSER_EDDYSTONE_UID: string;
    PARSER_EDDYSTONE_URL: string;

    setHardwareEqualityEnforced(
      flag: boolean
    ): void;

    startForegroundService(notifData: NotificationData): Promise<any>;
    stopForegroundService(): Promise<any>;

    detectIBeacons(): void;

    detectAltBeacons(): void;

    detectEstimotes(): void;

    detectEddystoneUID(): void;

    detectEddystoneURL(): void;

    detectEddystoneTLM(): void;

    detectCustomBeaconLayout(
      parser: number
    ): void;

    setDebug(
      debug: boolean
    ): void;

    setEnableScheduledScanJobs(
      enableScanJobs: boolean
    ): void;

    setBackgroundMode(
      newMode: boolean
    ): void;

    setBackgroundScanPeriod(
      period: number
    ): void;

    setBackgroundBetweenScanPeriod(
      period: number
    ): void;

    setForegroundScanPeriod(
      period: number
    ): void;

    setRssiFilter(
      filterType: number,
      avgModifier: number
    ): void;

    getRangedRegions(): Promise<any>;

    getMonitoredRegions(): Promise<Array<BeaconRegion>>;

    checkTransmissionSupported(): Promise<number>;

    ///////////////////////////////////////////////////////
    // common iOS and Android
    ///////////////////////////////////////////////////////

    startMonitoringForRegion(
      region: BeaconRegion
    ): Promise<any>;

    /** IOS ONLY */
    startRangingBeaconsInRegion(
      region: BeaconRegion
    ): Promise<any>;

    /** ANDROID ONLY */
    startRangingBeaconsInRegion(
      // We can't simply reuse BeaconRegion as BeaconRegion.uuid is mandatory, whereas the uuid in this method is optional
      region: {
        identifier: string,
        uuid?: string
      }
    ): Promise<any>;

    /** ANDROID ONLY */
    startRangingBeaconsInRegion(
      regionId: string,
      beaconsUUID?: string
    ): Promise<any>;

    stopMonitoringForRegion(
      region: BeaconRegion
    ): Promise<any>;

    /** IOS ONLY */
    stopRangingBeaconsInRegion(
      region: BeaconRegion
    ): Promise<any>;

    /** ANDROID ONLY */
    stopRangingBeaconsInRegion(
      regionId: string,
      beaconsUUID?: string
    ): Promise<any>;

    /** ANDROID ONLY */
    stopRangingBeaconsInRegion(
      // We can't simply reuse BeaconRegion as BeaconRegion.uuid is mandatory, whereas the uuid in this method is optional
      region: {
        identifier: string,
        uuid?: string
      }
    ): Promise<any>;

    requestStateForRegion(
      region: BeaconRegion
    ): void;

    BeaconsEventEmitter: BeaconEventEmiter
  }

  const beacons: Beacons;
  export default beacons;
}

interface BeaconEventEmiter implements DeviceEventEmitterStatic {
  addListener<T>(type: string, listener: (data: T) => void, context?: any): EmitterSubscription;
}
