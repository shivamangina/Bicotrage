/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import { TrashIcon, ArrowsRightLeftIcon } from '@heroicons/react/20/solid'

export default function Example(data: any) {
    const { steps, tokens, updateStepToken, updateStepAmount, deleteStep } = data
    return (
        <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-1 mb-7">
            {steps.map((step: any) => (
                <li key={step.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
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
                        <div className="flex-shrink-0 pr-2">
                            <button
                                type="button"
                                onClick={(e) => deleteStep(step.id)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="sr-only">Open options</span>
                                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="container flex flex-col flex-wrap items-center justify-between  mx-auto md:flex-row ">
                            <p className="inline-flex items-center ml-1 space-x-5 text-sm text-gray-500 lg:justify-start">
                                <img className="h-7 w-7 flex-shrink-0 rounded-full bg-gray-300 mr-2" src={step.name === "UniSwap" ? step.fromLogo : step.logo} alt="" /> {""}
                                <div className="sm:col-span-3">
                                    <div className="mt-1">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            onChange={(e) => updateStepToken(e?.target.value, step.id, step.name === "UniSwap" ? true : false, "from")}
                                            value={step.name === "UniSwap" ? step.fromToken : step.token}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            {
                                                tokens.map((token: any) => {
                                                    return <option selected={step.token}>{token.symbol}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                {step.name === "UniSwap" &&
                                    <>
                                        <ArrowsRightLeftIcon className="h-5 w-5" aria-hidden="true" />
                                        <img className="h-7 w-7 flex-shrink-0 rounded-full bg-gray-300 mr-2" src={step.name === "UniSwap" ? step.toLogo : step.logo} alt="" /> {""}
                                        <div className="sm:col-span-3">
                                            <div className="mt-1">
                                                <select
                                                    id="country"
                                                    name="country"
                                                    autoComplete="country-name"
                                                    onChange={(e) => updateStepToken(e?.target.value, step.id, step.name === "UniSwap" ? true : false, "to")}
                                                    value={step.toToken}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                >
                                                    {
                                                        tokens.map((token: any) => {
                                                            return <option selected={step.token}>{token.symbol}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                }
                            </p>
                            <p className="inline-flex items-center ml-1 space-x-5 text-sm text-gray-500 lg:justify-end">
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                                        $
                                    </span>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={step.amount}
                                        onChange={(e) => { updateStepAmount(e.target.value, step.id) }}
                                        autoComplete="username"
                                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </p>
                        </div>
                    </div>

                </li>
            ))}
        </ul>
    )
}

