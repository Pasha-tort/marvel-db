export default class MarvelService {

    constructor() {
        this._apiBase = 'https://gateway.marvel.com/v1/public';
        this._ts = 'ts=kergnjtojtnwo';
        this._publicKey = 'apikey=6fb7e819516b8ecfd3f6909059abd1d4';
        this._hash = 'hash=459cd7c41add172a844babb771612be9';
    }

    getResurse = async(url) => {
        const result = await fetch(`${this._apiBase}${url}${this._ts}&${this._publicKey}&${this._hash}`);

        if (!result.ok) {
            throw new Error(`Не получилось сделать запрос по серверу ${this._apiBase}${url}, статус запроса ${result.status}`);
        }

        return await result.json();
    }

    getCharactersAll = async(url) => {
        const res = await this.getResurse(url);
        return await this._transformCharactersAll(res);
    }

    getCharacter = async(id) => {
        const res = await this.getResurse(`/characters/${id}?`);
        return await this._transformCharacter(res);
    }

    getComicsAll = async(url) => {
        const res = await this.getResurse(url);
        return await this._transformComicsAll(res);
    }

    getComics = async(id) => {
        const res = await this.getResurse(`/comics/${id}?`);
        return await this._transformComics(res);
    }

    getCreator = async(id) => {
        const res = await this.getResurse(`/creators/${id}?`);
        return await res;
    }

    getCreatorsAll = async(url) => {
        const res = await this.getResurse(url);
        return await this._transformCreatorsAll(res);
    }

    getSeriesAll = async(url) => {
        const res = await this.getResurse(url);
        return await this._transformSeriesAll(res);
    }

    _transformCharacter = (dataChar) => {
        if (dataChar.data.results[0].description === '') {
            dataChar.data.results[0].description = 'Data unknow :-(';
        }
        return dataChar.data.results[0];
    }

    _transformCharactersAll = (result) => {
        const total = result.data.total;
        return {
            list: result.data.results,
            total: total,
        }
    }

    _transformComics = (dataComics) => {
        if (dataComics.data.results[0].description === null) {
            dataComics.data.results[0].description = 'Data unknow :-(';
        }
        return dataComics.data.results[0];
    }

    _transformComicsAll = (result) => {
        const total = result.data.total
        return {
            list: result.data.results,
            total: total,
        }
    }

    _transformCreatorsAll = (result) => {
        const total = result.data.total
        return  {
            list: result.data.results,
            total: total,
        }
    }

    _transformSeriesAll = (data) => {
        return data.data.results;
    }
}


