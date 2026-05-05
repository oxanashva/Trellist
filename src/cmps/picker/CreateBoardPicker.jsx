import { useState } from 'react'
import {
  cloudinaryGradientColorsMap,
  darkenRgb,
  getAverageColor,
  gradientColorsMap,
} from '../../services/util.service'
import BoardImage from '../../assets/images/board.svg?react'
import CheckIcon from '../../assets/images/icons/check.svg?react'

export function CreateBoardPicker({ onAddBoard, onClose }) {
  const initialBgName = Object.keys(gradientColorsMap)[0]
  const [selectedBg, setSelectedBg] = useState({
    name: initialBgName,
    imgUrl: cloudinaryGradientColorsMap[initialBgName],
  })
  const [boardName, setBoardName] = useState('')

  async function handleBackgroundChanged(bgName) {
    const imgUrl = cloudinaryGradientColorsMap[bgName]
    setSelectedBg({ name: bgName, imgUrl })
  }

  async function onSubmit(ev) {
    ev.preventDefault()

    // Calculate the colors based on the currently selected image
    const color = await getAverageColor(selectedBg.imgUrl)
    const background = darkenRgb(color)

    onAddBoard({
      name: boardName,
      prefs: {
        background,
        backgroundImage: selectedBg.imgUrl,
      },
    })

    onClose()
  }

  // Dynamic style for the preview container
  const boardImageStyle = {
    backgroundImage: `url(${selectedBg.imgUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <section className="create-board-picker">
      <header className="picker-header">
        <h3 className="picker-title">Create board</h3>
      </header>

      {/* Wrapped in a form */}
      <form className="create-board-editor" onSubmit={onSubmit}>
        <div style={boardImageStyle} className="board-img-container">
          <BoardImage />
        </div>

        <h3 className="picker-subtitle create-board-title">Board title</h3>

        <input
          type="text"
          required
          value={boardName}
          onChange={(ev) => setBoardName(ev.target.value)}
        />

        <h3 className="picker-subtitle">Background</h3>

        <ul className="gradients-grid">
          {Object.entries(gradientColorsMap).map(([name, GradientComponent]) => (
            <li
              key={name}
              className={`gradient ${selectedBg.name === name ? 'active' : ''}`}
              onClick={() => handleBackgroundChanged(name)}
            >
              <GradientComponent />
              {selectedBg.name === name && (
                <span className="check-icon-container">
                  <CheckIcon width={16} height={16} fill="currentColor" />
                </span>
              )}
            </li>
          ))}
        </ul>

        <button type="submit" disabled={!boardName} className="btn-primary create-btn">
          Create
        </button>
      </form>
    </section>
  )
}
