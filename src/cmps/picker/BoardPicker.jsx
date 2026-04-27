import { useState } from 'react'

import ShevronLeft from '../../assets/images/icons/shevron-left.svg?react'
import StarIcon from '../../assets/images/icons/star.svg?react'
import StarSolidIcon from '../../assets/images/icons/star-solid.svg?react'
import MinusIcon from '../../assets/images/icons/minus.svg?react'
import PlusIcon from '../../assets/images/icons/plus.svg?react'
import ColorsImg from '../../assets/images/colors.png'

import {
  cloudinaryGradientColorsMap,
  darkenRgb,
  getAverageColor,
  gradientColorsMap,
  makeId,
} from '../../services/util.service'

import { ImgUploader } from '../ImgUploader'

export function BoardPicker({
  isStarred,
  setStarred,
  prefs,
  uploadedImages,
  onUpdateBoard,
  onRemoveBoard,
}) {
  const [isEditingBoardBackground, setIsEditingBoardBackground] = useState(false)
  const [isEditingColors, setIsEditingColors] = useState(false)
  const [confirmRemove, setConfirmRemove] = useState(false)

  async function handleImageUploaded(imgUrl, fileName, format) {
    const background = await getAverageColor(imgUrl)

    const uploadedImgId = makeId()

    const updatedFields = {
      prefs: {
        _id: uploadedImgId,
        background,
        backgroundImage: imgUrl,
      },
      uploadedImages: [
        ...(uploadedImages || []),
        {
          _id: uploadedImgId,
          name: fileName,
          url: imgUrl,
        },
      ],
    }

    onUpdateBoard(updatedFields)
  }

  async function handleSelectUploadedImage(img) {
    const background = await getAverageColor(img.url)

    onUpdateBoard({
      prefs: {
        backgroundImage: img.url,
        _id: img._id,
        background,
      },
    })
  }

  async function handleBackgroundChanged(bgName) {
    const imgUrl = cloudinaryGradientColorsMap[bgName]

    const color = await getAverageColor(imgUrl)
    const background = darkenRgb(color)

    onUpdateBoard({
      prefs: {
        background,
        backgroundImage: imgUrl,
      },
    })

    setIsEditingColors(false)
  }

  const boardImgUrl = prefs?.backgroundImage
    ? prefs?.backgroundImage
    : cloudinaryGradientColorsMap[prefs?.background]

  const isCustomImageSelected =
    prefs?.backgroundImage && !cloudinaryGradientColorsMap[prefs?.background]

  const starBtnStyle = isStarred ? { color: '#FBC828' } : {}

  return (
    <section className="board-picker">
      {!isEditingBoardBackground && !isEditingColors && !confirmRemove && (
        <>
          <header className="picker-header">
            <h2 className="picker-title">Menu</h2>
          </header>

          <div className="board-editor">
            <ul>
              <li>
                <button className="action-btn" onClick={setStarred}>
                  <span style={starBtnStyle} className="action-btn-icon">
                    {isStarred ? (
                      <StarSolidIcon width={16} height={16} />
                    ) : (
                      <StarIcon width={16} height={16} />
                    )}
                  </span>
                  <span>Star</span>
                </button>
              </li>
              <li>
                <button className="action-btn" onClick={() => setIsEditingBoardBackground(true)}>
                  <span
                    style={{ backgroundImage: `url(${boardImgUrl})` }}
                    className="action-btn-img"
                  ></span>
                  <span>Change background</span>
                </button>
              </li>
              <li>
                <button className="action-btn" onClick={() => setConfirmRemove(true)}>
                  <span className="action-btn-icon">
                    <MinusIcon width={16} height={16} />
                  </span>
                  <span>Close board</span>
                </button>
              </li>
            </ul>
          </div>
        </>
      )}

      {isEditingBoardBackground && !confirmRemove && (
        <>
          <header className="picker-header">
            <h3 className="picker-title">Change background</h3>
            <button
              className="icon-btn dynamic-btn previous-btn"
              onClick={() => {
                setIsEditingBoardBackground(false)
              }}
            >
              <ShevronLeft width={16} height={16} fill="currentColor" />
            </button>
          </header>
          <ul className="change-bg-actions">
            <li className="change-bg-item">
              <ImgUploader onUploaded={handleImageUploaded}>
                {(imgData, isUploading) => (
                  <>
                    {isUploading ? (
                      <div className="loader-container change-bg-loader">
                        <div className="loader small-loader"></div>
                      </div>
                    ) : (
                      <button className="btn-neutral upload-btn change-bg-btn">
                        <span className="upload-icon">
                          <PlusIcon width={24} height={24} />
                        </span>
                      </button>
                    )}
                  </>
                )}
              </ImgUploader>
              <span className="change-bg-btn-name">Custom</span>
            </li>
            <li className="change-bg-item">
              <input
                type="button"
                style={{ backgroundImage: `url(${ColorsImg})` }}
                className="change-bg-btn colors-btn"
                onClick={() => {
                  setIsEditingColors(true)
                  setIsEditingBoardBackground(false)
                }}
              ></input>
              <span className="change-bg-btn-name">Colors</span>
            </li>
          </ul>
          {isCustomImageSelected && (
            <div className="preview-uploaded-imgs">
              {uploadedImages?.map((img) => {
                const isSelected = prefs?.backgroundImage === img.url
                return (
                  <div className="uploaded-img-wrapper" key={img._id}>
                    <div
                      className={`preview-uploaded-img ${isSelected ? 'selected' : ''}`}
                      style={{ backgroundImage: `url(${img.url})` }}
                      onClick={() => handleSelectUploadedImage(img)}
                    ></div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {isEditingColors && !isEditingBoardBackground && !confirmRemove && (
        <>
          <header className="picker-header">
            <h3 className="picker-title">Colors</h3>
            <button
              className="icon-btn dynamic-btn previous-btn"
              onClick={() => {
                setIsEditingColors(false)
              }}
            >
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
      )}

      {confirmRemove && (
        <>
          <header className="picker-header">
            <h3 className="picker-title">Delete board?</h3>
            <button
              className="icon-btn dynamic-btn previous-btn"
              onClick={() => {
                setConfirmRemove(false)
              }}
            >
              <ShevronLeft width={16} height={16} fill="currentColor" />
            </button>
          </header>
          <div className="board-editor confirm-content">
            <div className="confirm-text">
              <span>
                All lists, cards and actions will be deleted, and you won’t be able to re-open the
                board. There is no undo.
              </span>
            </div>
            <button className="btn-danger" onClick={onRemoveBoard}>
              Delete
            </button>
          </div>
        </>
      )}
    </section>
  )
}
