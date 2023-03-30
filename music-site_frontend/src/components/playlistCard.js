import React from 'react'
import { Card } from "flowbite-react";

function PlaylistCard(props) {
    const playlist = props.playlist
    console.log(playlist)
    return (
        <div className="max-w-sm">
            <Card>
                <h5 className="mb-3 text-base text-center font-semibold text-gray-900 dark:text-white lg:text-xl">
                    <span>{playlist.name}</span>
                    <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        Public
                    </span>
                </h5>
                <p className="text-sm text-center font-normal text-gray-500 dark:text-gray-400">
                    {playlist.description}
                </p>
                <ul className="my-4 space-y-3">
                    {playlist.uri.map((track) => {
                        return (
                            <>
                                <li>
                                    <div className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
                                        <img />
                                        <span className="ml-3 flex-1 whitespace-nowrap">
                                            {track}
                                        </span>
                                        <span className="ml-3 flex-1 whitespace-nowrap">
                                            Duration
                                        </span>
                                    </div>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </Card>
        </div>
    )
}

export default PlaylistCard;