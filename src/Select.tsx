import { useEffect, useState } from "react"

import styles from "./select.module.css"

type SelectOptions = {
    label: string
    value: string | number
}

type SelectProps = {
    options: SelectOptions
    value?: SelectOptions | undefined
    onChange: (value: SelectOptions | undefined) => void
}

export function Select({ options, value, onChange }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    function clearOptions() {
        onChange(undefined);
    }

    function selectOptions(option: SelectOptions) {
        if (option !== value) onChange(option)
    }

    function isOptionSelected(option: SelectOptions) {
        return option === value;
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen])





    return (
        <div
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen((prev) => !prev)}
            tabIndex={0}
            className={styles.container}
        >
            <span className={styles.value}>{value?.label}</span>

            <button
                onClick={(e) => {
                    clearOptions()
                    e.stopPropagation();
                }}
                className={styles["clear-btn"]}
            >
                &times;
            </button>

            <div className={styles.divider}></div>
            <div className={styles.caret}></div>

            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option: string, index: number) => (
                    <li
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false)
                            selectOptions(option)
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.value}
                        className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""} ${index === highlightedIndex ? styles.highlighted : ""}`}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    )
}