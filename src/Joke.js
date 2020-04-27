import React, { Component } from 'react'
import { Card, CardGroup } from 'react-bootstrap'


export default class Joke extends Component {

    componentDidMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('joke') === null)
                this.setState({ joke: "loading..." })
            else
                this.setState({ joke: localStorage.getItem('joke') })
        }

        var md5 = require('md5');

        var ts = new Date().getTime()
        var publicK = '0748d1fafa91c1e71ce4943dce7993e1'
        var privateK = '6c8cde1aca27791efe9e24ec3fed522205890b96'
        var hash = md5(ts + privateK + publicK)



        fetch("https://gateway.marvel.com:443/v1/public/characters?ts=" + ts + "&apikey=" + publicK + "&hash=" + hash)
            .then(res => {
                return res.json();
            }).then(res => {
                this.setState({ characters: res.data.results })
                localStorage.setItem('characters', res.data.results);
            });
    }

    state = {
        characters: []
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <th>Character name</th>
                        <th>Description</th>
                    </thead>
                    <tbody>
                        {this.state.characters.map(t => {
                            return (
                                <tr>
                                    <td>{t.name}</td>
                                    <td>{t.description}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
