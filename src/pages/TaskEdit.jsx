import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams, useOutletContext } from "react-router"

import { updateBoard } from "../store/actions/board.actions"

import MoreIcon from '../assets/images/icons/more.svg?react'
import ImageIcon from '../assets/images/icons/image.svg?react'
import CloseIcon from '../assets/images/icons/close.svg?react'
import CircleIcon from '../assets/images/icons/circle.svg?react'
import CircleCheckIcon from '../assets/images/icons/circle-check.svg?react'
import PlusIcon from '../assets/images/icons/plus.svg?react'
import LabelIcon from '../assets/images/icons/label.svg?react'
import ClockIcon from '../assets/images/icons/clock.svg?react'
import CheckListIcon from '../assets/images/icons/checklist.svg?react'
import MemberPlusIcon from '../assets/images/icons/member-plus.svg?react'
import ThumbsUpIcon from '../assets/images/icons/thumbs-up.svg?react'
import DescriptionIcon from '../assets/images/icons/description.svg?react';

export function TaskEdit() {
    const elDialog = useRef(null)
    const { taskId } = useParams()

    const board = useSelector(storeState => storeState.boardModule.board)
    const task = board?.tasks.find(task => task._id === taskId)
    const group = board?.groups.find(group => group._id === task.idGroup)

    const [isChecked, setIsChecked] = useState(task.closed || false)
    const [isEditing, setIsEditing] = useState(false)

    async function handleCheck() {
        const newStatus = !isChecked
        setIsChecked(newStatus)

        updateBoard({
            ...board,
            tasks: board.tasks.map(c => c._id === task._id ? { ...c, closed: newStatus } : c)
        })
    }


    useEffect(() => {
        elDialog.current.showModal()
    }, [])


    return (
        <dialog ref={elDialog} className="task-edit">
            <header>
                <span >{group.name}</span>
                <div className="task-header-actions">
                    <button className="icon-btn dynamic-btn">
                        <ImageIcon width={16} height={16} fill="currentColor" />
                    </button>
                    <button className="icon-btn dynamic-btn">
                        <MoreIcon width={16} height={16} fill="currentColor" />
                    </button>
                    <Link to={`/board/${board._id}`} className="icon-btn dynamic-btn link-btn">
                        <CloseIcon width={24} height={24} fill="currentColor" />
                    </Link>
                </div>
            </header>
            <div className="content-wrapper">
                <main>
                    <section className="task-title task-grid-container">
                        {/* TODO: implement editable task name and complete status */}
                        <div className="task-icon" onClick={handleCheck}>
                            {isChecked
                                ? <span style={{ color: "#6A9A23" }} title="Mark incomplete"><CircleCheckIcon width={16} height={16} fill="currentColor" /></span>
                                : <span title="Mark complete"><CircleIcon width={16} height={16} fill="currentColor" /></span>}
                        </div>
                        <h2>{task.name}</h2>
                    </section>
                    <div className="task-content">
                        <section className="task-actions task-grid-container">
                            <div></div>
                            <div className="task-actions-btns">
                                <button className="action-btn">
                                    <PlusIcon width={16} height={16} fill="currentColor" />
                                    <span>Add</span>
                                </button>
                                <button className="action-btn">
                                    <LabelIcon width={16} height={16} fill="currentColor" />
                                    <span>Labels</span>
                                </button>
                                <button className="action-btn">
                                    <ClockIcon width={16} height={16} fill="currentColor" />
                                    <span>Dates</span>
                                </button>
                                <button className="action-btn">
                                    <CheckListIcon width={16} height={16} fill="currentColor" />
                                    <span>Checkgroup</span>
                                </button>
                                <button className="action-btn">
                                    <MemberPlusIcon width={16} height={16} fill="currentColor" />
                                    <span>Members</span>
                                </button>
                            </div>
                        </section>
                        <section className="task-actions task-grid-container">
                            <div></div>
                            <h3 className="votes-heading">Votes</h3>
                            <div></div>
                            <button className="action-btn vote-btn">
                                <ThumbsUpIcon width={16} height={16} fill="currentColor" />
                                <span>Vote</span>
                            </button>
                        </section>
                        <section className="task-actions task-grid-container">
                            <div className="task-icon">
                                <DescriptionIcon width={16} height={16} fill="currentColor" />
                            </div>
                            <h3 className="description-heading">Description</h3>
                            <div></div>
                            {task.desc && <p>{task.desc}</p>}
                            {(!task.desc && !isEditing) &&
                                <button
                                    className="add-description-btn"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Add a more detailed description
                                </button>}
                            {/* TODO: implement editable description */}
                            {isEditing && <form>
                                <textarea
                                    defaultValue={task.desc}
                                    placeholder="Add a more detailed description">
                                </textarea>
                                <div className="edit-description-actions">
                                    <button className="btn-primary">Save</button>
                                    <button className="dynamic-btn">Cancel</button>
                                </div>
                            </form>}
                        </section>
                    </div>
                </main>
                <aside>Comments</aside>
            </div>
        </dialog>
    )
}