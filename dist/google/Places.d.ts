export declare class GooglePlaces {
    private _apiKey?;
    private _debug;
    constructor(opts?: IGooglePlacesConfig);
    autocomplete: (opts?: GooglePlacesAutocompleteOpts | undefined) => Promise<GooglePlaceAutocompleteResponse>;
    queryautocomplete: (opts?: GooglePlacesQueryAutocompleteOpts | undefined) => Promise<GooglePlaceQueryAutocompleteResponse>;
    details: (opts?: GooglePlacesDetailsOpts | undefined) => Promise<GooglePlaceDetailsResponse>;
    nearbysearch: (opts?: GooglePlacesNearbySearchOpts | undefined) => Promise<GooglePlaceNearbySearchResponse>;
    textsearch: (opts?: GooglePlacesTextSearchOpts | undefined) => Promise<GooglePlaceTextSearchResponse>;
    radarsearch: (opts?: GooglePlacesOptions) => Promise<GooglePlaceBaseResponse>;
    apiKey: string | undefined;
    debug: boolean;
    private _googleApiRequest;
    private _permitParams;
    private _log;
    private _query;
}
declare const _default: GooglePlaces;
export default _default;
