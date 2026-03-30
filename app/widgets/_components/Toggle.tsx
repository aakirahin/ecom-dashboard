import React, { useState } from 'react'

type Props = {
    label?: string;
    initial?: boolean;
    onToggle?: (state: boolean) => void;
    error: Error | null
}

const Toggle = ({
    label, 
    initial = false, 
    onToggle,
    error
}: Props) => {
    const [enabled, setEnabled] = useState(initial);

    const handleToggle = () => {
        const newState = !enabled;
        setEnabled(newState);
        onToggle?.(newState);
    };

    return (
        <div className="flex flex-col gap-1">
            {label && <label>{label}</label>}
            <button
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    enabled ? "bg-blue-500" : "bg-gray-300"
                }`}
                disabled={!!error}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                />
            </button>
        </div>
    );
}

export default Toggle