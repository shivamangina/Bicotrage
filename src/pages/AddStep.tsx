/* eslint-disable jsx-a11y/no-redundant-roles */

import { PlusIcon } from '@heroicons/react/20/solid'

const people = [

    {
        exchange: "AAVE",
        methods: [
            {
                description: 'Buy Flash Loan',
                method: "Borrow",

            },
            {
                description: 'Repay Flash Loan',
                method: "Repay",
            },
        ]
    },
    {
        exchange: "Uniswap",
        methods: [
            {
                description: 'Swap your currency',
                method: "Swap",
            }
        ]
    }

]

const addNewStep = (name: string, method: string, description: string) => {
    console.log("Add New Step");
    const newStep = {
        name,
        description,
        method,
    };
    console.log(newStep, "newStep");
}

export default function Example() {
    return (
        <div className="container items-center max-w-6xl px-8 mx-auto">
            <div>
                <div className="text-center">
                    <h2 className="mt-2 text-lg font-medium text-gray-900">New Method</h2>
                </div>
                <form className="mt-6 sm:flex sm:items-center" action="#">
                    <label htmlFor="emails" className="sr-only">
                        Email addresses
                    </label>
                    <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
                        <input
                            type="text"
                            name="emails"
                            id="emails"
                            className="block w-full rounded-md border-gray-300 pr-32 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Search for Any Exchange Or Method"
                        />
                    </div>

                </form>
            </div>
            <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-500">List of Exchanges</h3>
                <ul role="list" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-1">
                    {people.map((person, personIdx) => (
                        <div key={personIdx}>
                            <h2 className='className="text-base font-medium text-gray-900'>{person.exchange}</h2>
                            <ul role="list" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {person.methods.map((methodObj, id) => (
                                    <li key={id}>
                                        <button
                                            type="button"
                                            onClick={() => addNewStep(person.exchange, methodObj.method, methodObj.description)}
                                            className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            <span className="flex min-w-0 flex-1 items-center space-x-3">
                                                <span className="block flex-shrink-0">
                                                </span>
                                                <span className="block min-w-0 flex-1">
                                                    <span className="block truncate text-sm font-medium text-gray-900">{methodObj.method}</span>
                                                </span>
                                            </span>
                                            <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
                                                <PlusIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}
