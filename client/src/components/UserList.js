import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../context-providers/AppContextProvider.js';

export function UserList() {
    const { allUsers } = useContext(AppContext);

    return (
        <div>
            <div>
                <p>Total users: {allUsers ? allUsers.length : 0 }</p>
            </div>
            <div>
                {
                    allUsers ?
                        allUsers.map((item, index) => <p id="node" key={index}>{item.nickname}</p>)
                        : null
                }
            </div>
        </div>
    );
}