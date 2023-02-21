import React from 'react';

const Breadcrumbs = ({ values = [] }) => {
    return (
        <div>
            <nav className="w-full rounded-md">
                <ol className="list-reset flex">
                    {values?.map((item, index) => {
                        if (index === 0) {
                            return (
                                <li>
                                    <span
                                        href="#"
                                        className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >
                                        {item}
                                    </span>
                                </li>
                            );
                        } else {
                            return (
                                <>
                                    <li>
                                        <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
                                    </li>
                                    <li className="text-neutral-500 dark:text-neutral-400">{item}</li>
                                </>
                            );
                        }
                    })} 
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumbs;
