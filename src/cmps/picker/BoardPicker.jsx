import { useState } from 'react'

import ShevronLeft from '../../assets/images/icons/shevron-left.svg?react'
import StarIcon from '../../assets/images/icons/star.svg?react'
import StarSolidIcon from '../../assets/images/icons/star-solid.svg?react'
import MinusIcon from '../../assets/images/icons/minus.svg?react'
import PlusIcon from '../../assets/images/icons/plus.svg?react'
import ColorsImg from '../../assets/images/colors.png'

import { cloudinaryGradientColorsMap, darkenHex, gradientColorsMap } from '../../services/util.service'

import { ImgUploader } from '../ImgUploader'

import { FastAverageColor } from "fast-average-color"
const fac = new FastAverageColor()

export function BoardPicker({ setStarred, isStarred, prefs, onUpdateBoard, onRemoveBoard }) {
    const [isEditingBoardBackground, setIsEditingBoardBackground] = useState(false)
    const [isEditingColors, setIsEditingColors] = useState(false)

    async function handleImageUploaded(imgUrl, fileName, format) {
        let background = ""
        try {
            const color = await fac.getColorAsync(imgUrl)
            background = color.rgb
        } catch (error) {
            console.error("Could not calculate average color:", error)
            background = "#ffffff"
        }

        const newPrefs = {
            prefs: {
                background,
                backgroundImage: imgUrl,
            }
        }

        onUpdateBoard(newPrefs)
        setIsEditingBoardBackground(false)
    }

    async function handleBackgroundChanged(bgName) {
        const imgUrl = cloudinaryGradientColorsMap[bgName]

        let background = ""
        try {
            const color = await fac.getColorAsync(imgUrl)
            background = darkenHex(color.hex, 0.7)
        } catch (err) {
            console.error("Could not calculate average color:", err)
            background = "#ffffff"
        }

        onUpdateBoard({
            prefs: {
                background,
                backgroundImage: imgUrl
            }
        })

        setIsEditingColors(false)
    }


    const boardImgUrl = prefs?.backgroundImage
        ? prefs?.backgroundImage
        : cloudinaryGradientColorsMap[prefs?.background]

    const starBtnStyle = isStarred ? { color: '#FBC828' } : {}

    return (
        <section className="board-picker">
            {!isEditingBoardBackground && !isEditingColors &&
                <>
                    <header className="picker-header">
                        <h2 className="picker-title">Colors</h2>
                    </header>

                    <div className="board-editor">
                        <ul>
                            <li>
                                <button
                                    className="action-btn"
                                    onClick={setStarred}
                                >
                                    <span style={starBtnStyle} className="action-btn-icon">
                                        {isStarred
                                            ? <StarSolidIcon width={16} height={16} />
                                            : <StarIcon width={16} height={16} />}
                                    </span>
                                    <span>Star</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="action-btn"
                                    onClick={() => setIsEditingBoardBackground(true)}
                                >
                                    <span className="action-btn-img">
                                        <img src={boardImgUrl} alt="Board Image" />
                                    </span>
                                    <span>Change background</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="action-btn"
                                    onClick={onRemoveBoard}
                                >
                                    <span className="action-btn-icon">
                                        <MinusIcon width={16} height={16} />
                                    </span>
                                    <span>Remove board</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </>
            }

            {isEditingBoardBackground &&
                <>
                    <header className="picker-header">
                        <h3 className="picker-title">Colors</h3>
                        <button
                            className="icon-btn dynamic-btn previous-btn"
                            onClick={() => {
                                setIsEditingBoardBackground(false)
                            }}>
                            <ShevronLeft width={16} height={16} fill="currentColor" />
                        </button>
                    </header>
                    <ul className="change-bg-actions">
                        <li className="change-bg-item">
                            <ImgUploader
                                onUploaded={handleImageUploaded}
                            >
                                {(imgData, isUploading) => (
                                    <>
                                        {isUploading ? (
                                            <div className="loader-container">
                                                <div className="loader small-loader"></div>
                                            </div>
                                        ) : (
                                            <button
                                                className="btn-neutral upload-btn change-bg-btn"
                                            >
                                                <span className="upload-icon">
                                                    <PlusIcon width={24} height={24} />
                                                </span>
                                            </button>
                                        )}
                                    </>
                                )}
                            </ImgUploader>
                            <span>Custom</span>
                        </li>
                        <li className="change-bg-item">
                            <button
                                className="change-bg-btn"
                                onClick={() => {
                                    setIsEditingColors(true)
                                    setIsEditingBoardBackground(false)
                                }}
                            >
                                <img src={ColorsImg} alt="Colors" />
                            </button>
                            <span>Colors</span>
                        </li>
                    </ul>
                </>
            }

            {isEditingColors && !isEditingBoardBackground &&
                <>
                    <header className="picker-header">
                        <h3 className="picker-title">Colors</h3>
                        <button
                            className="icon-btn dynamic-btn previous-btn"
                            onClick={() => {
                                setIsEditingColors(false)
                            }}>
                            <ShevronLeft width={16} height={16} fill="currentColor" />
                        </button>
                    </header>

                    <div className="board-editor">
                        <ul className="gradients-grid">
                            {Object.entries(gradientColorsMap).map(([name, GradientComponent]) => (
                                <li key={name} className="change-bg-item">
                                    <button
                                        className="change-bg-btn change-color-btn"
                                        onClick={() => handleBackgroundChanged(name)}
                                    >
                                        <GradientComponent />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            }
        </section>
    )
}