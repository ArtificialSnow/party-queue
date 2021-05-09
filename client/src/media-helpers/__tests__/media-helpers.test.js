import { parseYoutubeUrl, parseSoundCloudUrl, getYouTubeMediaInfo, getSoundCloudMediaInfo} from '../media-helpers';

//Youtube link not from a list
it( 'gets 4NRXx6U8ABQ from https://www.youtube.com/watch?v=4NRXx6U8ABQ' , async() => {
    expect(await parseYoutubeUrl('https://www.youtube.com/watch?v=4NRXx6U8ABQ')).toBe('4NRXx6U8ABQ');
})

//Youtube link not from a list
it( 'gets _JZom_gVfuw from https://www.youtube.com/watch?v=_JZom_gVfuw' , async() => {
    expect(await parseYoutubeUrl('https://www.youtube.com/watch?v=_JZom_gVfuw')).toBe('_JZom_gVfuw');
})

//Youtube link from a list
it( 'gets EAc4zHEDd7o from https://www.youtube.com/watch?v=EAc4zHEDd7o&list=RDLIIDh-qI9oI&index=8' , async() => {
    expect(await parseYoutubeUrl('https://www.youtube.com/watch?v=EAc4zHEDd7o&list=RDLIIDh-qI9oI&index=8')).toBe('EAc4zHEDd7o');
})

//Youtube link from a list
it( 'gets 34Na4j8AVgA from https://www.youtube.com/watch?v=34Na4j8AVgA&list=RDLIIDh-qI9oI&index=5' , async() => {
    expect(await parseYoutubeUrl('https://www.youtube.com/watch?v=34Na4j8AVgA&list=RDLIIDh-qI9oI&index=5')).toBe('34Na4j8AVgA');
})

//Sound cloud link
it( 'gets kanyewest/nomorepartiesinla from https://soundcloud.com/kanyewest/nomorepartiesinla' , async() => {
    expect(await parseSoundCloudUrl('https://soundcloud.com/kanyewest/nomorepartiesinla')).toBe('kanyewest/nomorepartiesinla');
})

//Sound cloud link
it( 'gets easymoneydom/asap-rocky-ft-lana-del-ray from https://soundcloud.com/easymoneydom/asap-rocky-ft-lana-del-ray' , async() => {
    expect(await parseSoundCloudUrl('https://soundcloud.com/easymoneydom/asap-rocky-ft-lana-del-ray')).toBe('easymoneydom/asap-rocky-ft-lana-del-ray');
})

//Youtube video data from video id
it( 'gets title and artis from 4NRXx6U8ABQ' , async() => {
    expect(await getYouTubeMediaInfo('4NRXx6U8ABQ')).toStrictEqual({"artist": "TheWeekndVEVO", "title": "The Weeknd - Blinding Lights (Official Video)"});
})

//Youtube video data from video id
it( 'gets title and artis from TrnUKfSg_kg' , async() => {
    expect(await getYouTubeMediaInfo('TrnUKfSg_kg')).toStrictEqual({"artist": "Nicky Romero", "title": "Avicii vs Nicky Romero - I Could Be The One"});
})

//SoundCloud video data from video id
it( 'gets title and artis from easymoneydom/asap-rocky-ft-lana-del-ray' , async() => {
    expect(await getSoundCloudMediaInfo('easymoneydom/asap-rocky-ft-lana-del-ray')).toStrictEqual({"artist": "dom $", "title": "ASAP Rocky Ft. Lana Del Rey - Ridin' by dom $"});
})

//SoundCloud video data from video id
it( 'gets title and artis from kanyewest/nomorepartiesinla' , async() => {
    expect(await getSoundCloudMediaInfo('kanyewest/nomorepartiesinla')).toStrictEqual({"artist": "Kanye West", "title": "NO MORE PARTIES IN L.A. FEAT. KENDRICK LAMAR by Kanye West"});
})



