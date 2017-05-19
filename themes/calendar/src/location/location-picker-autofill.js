/**
 * Created by Heath on 28/08/16.
 */
export default function LocationPickerAutoFill() {

    var EventLat = $('#addEventLat'),
        EventLon = $('#addEventLon'),
        EventRadius = $('#addEventRadius'),
        EventAddress = $('#addEventAddress');

    $('#eventMap').locationpicker({
        location: {
            latitude: -45.8751791,
            longitude: 170.5031467
        },
        radius: 300,
        inputBinding: {
            latitudeInput: $(EventLat),
            longitudeInput: $(EventLon),
            radiusInput: $(EventRadius),
            locationNameInput: $(EventAddress)
        },
        enableAutocomplete: true,
        markerIcon: 'mysite/images/svg/location.svg'
    });
// Modal Dialog control | reference
    $('#AddHappEventModal').on('shown.bs.modal', function () {
        $('#addEventMap').locationpicker('autosize');
    });

    $('#addEventMap').locationpicker({
        location: {
            latitude: -45.8751791,
            longitude: 170.5031467
        },
        radius: 300,
        inputBinding: {
            latitudeInput: $(EventLat),
            longitudeInput: $(EventLon),
            radiusInput: $(EventRadius),
            locationNameInput: $(EventAddress)
        },
        enableAutocomplete: true,
        markerIcon: 'mysite/images/svg/location.svg'
    });

}