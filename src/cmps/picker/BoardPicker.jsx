import { useState } from 'react'

import ShevronLeft from '../../assets/images/icons/shevron-left.svg?react'
import StarIcon from '../../assets/images/icons/star.svg?react'
import StarSolidIcon from '../../assets/images/icons/star-solid.svg?react'
import MinusIcon from '../../assets/images/icons/minus.svg?react'
import BgColorSelection from '../../assets/images/bg-color-selection.png'

import { ImgUploader } from '../ImgUploader'

import { FastAverageColor } from "fast-average-color"
const fac = new FastAverageColor()

export function BoardPicker({ setStarred, isStarred, prefs, onUpdateBoard }) {
    const [isEditingBoardBackground, setIsEditingBoardBackground] = useState(false)

    async function handleImageUploaded(imgUrl, fileName, format) {
        let background = ""
        try {
            const color = await fac.getColorAsync(imgUrl)
            background = color.hex
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

    const boardImgUrl = prefs?.backgroundImage
        ? prefs?.backgroundImage
        : prefs?.sharedSourceUrl

    const starBtnStyle = isStarred ? { color: '#FBC828' } : {}

    return (
        <section className="board-picker">
            {!isEditingBoardBackground &&
                <>
                    <header className="picker-header">
                        <h2 className="picker-title">Colors</h2>
                    </header>

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
                                onClick={setStarred}
                            >
                                <span className="action-btn-icon">
                                    <MinusIcon width={16} height={16} />
                                </span>
                                <span>Remove board</span>
                            </button>
                        </li>
                    </ul>
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
                    <ul>
                        <li>
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
                                                className="btn-neutral upload-btn"
                                            >
                                                Custom
                                            </button>
                                        )}
                                    </>
                                )}
                                {/* <button className="bg-color-selection">
                                    <img src={BgColorSelection} alt="Background Color Selection" />
                                </button> */}
                            </ImgUploader>
                        </li>
                    </ul>
                </>
            }
        </section>
    )
}