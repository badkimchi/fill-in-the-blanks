import React from "react";

interface props {
    label: string;
    disabled: boolean;

    onClick(): void;
}

export const Btn: React.FC<props> = ({disabled, onClick, label}) => {
    return (
        <div className={'bg-transparent hover:bg-blue-300 text-blue-300 font-semibold ' +
            'hover:text-white py-2 px-4 border border-blue-300 hover:border-transparent rounded ' +
            'transition ease-in-out duration-100 text-center '}
        >
            <button className={'w-full h-full'} onClick={onClick} disabled={disabled}>
                {label}
            </button>
        </div>
    )
}