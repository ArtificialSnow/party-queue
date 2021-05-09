var React = require('react');
var QRCode = require('qrcode.react');

export function RoomQrCode(props) {
    const fullUrl = `http://www.musicqueue.net/${props.url}`;

    return (
        <div>
            <QRCode value={fullUrl} />
        </div>
    );
}