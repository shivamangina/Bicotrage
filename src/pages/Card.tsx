/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";

export default function Example(data: any) {
    const { steps, tokens } = data
    return (
        <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-1 mb-7">
            {steps.map((step: any) => (
                <li key={step.email} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <div className="flex w-full items-center justify-between space-x-6 p-6 bg-blue">
                        <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                                <h3 className="truncate text-lg font-medium text-gray-900">{step.name}</h3>
                                <span className="flex-shrink-0  px-2 py-0.3 mb-1 text-base  leading-6 text-white bg-purple-600 rounded-md sm:mb-0 hover:bg-indigo-700 ">
                                    {step.method}
                                </span>
                            </div>
                            <p className="mt-1 truncate text-sm text-gray-500">{step.description}</p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="container flex flex-col flex-wrap items-center justify-between  mx-auto md:flex-row ">
                            <p className="inline-flex items-center ml-1 space-x-5 text-sm text-gray-500 lg:justify-start">
                                <img className="h-7 w-7 flex-shrink-0 rounded-full bg-gray-300 mr-2" src={step.logo} alt="" /> {""}
                                <div className="sm:col-span-3">
                                    {/* <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Country
                                    </label> */}
                                    <div className="mt-1">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            value={step.token}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            {
                                                tokens.map((token: any) => {
                                                    return <option selected={step.token} >{token.symbol}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>


                            </p>
                            <p className="inline-flex items-center ml-1 space-x-5 text-sm text-gray-500 lg:justify-end">
                                {step.amount}
                            </p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

