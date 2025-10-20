import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router"

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
import DescriptionIcon from '../assets/images/icons/description.svg?react'
import CommentText from '../assets/images/icons/comment-text.svg?react'
import { makeId } from "../services/util.service"

export function TaskEdit() {
    const elDialog = useRef(null)
    const { taskId } = useParams()
    const nameInputRef = useRef(null)
    const descTextareaRef = useRef(null)
    const commentTextareaRef = useRef(null)

    const board = useSelector(storeState => storeState.boardModule.board)
    const task = board?.tasks.find(task => task._id === taskId)
    const group = board?.groups.find(group => group._id === task.idGroup)
    const comments = board?.actions.filter(action => {
        return action.data.idTask === task._id
    })
    console.log('comments :', comments);

    const [isChecked, setIsChecked] = useState(task.closed || false)
    const [isNameEditing, setIsNameEditing] = useState(false)
    const [isDescEditing, setIsDescEditing] = useState(false)
    const [isCommentEditing, setIsCommentEditing] = useState(false)

    const [taskName, setTaskName] = useState(task?.name || "")
    const [taskDescription, setTaskDescription] = useState(task?.desc || "")
    const [commentText, setCommentText] = useState("")

    useEffect(() => {
        elDialog.current.showModal()
    }, [])

    useEffect(() => {
        if (isNameEditing) {
            nameInputRef.current?.focus()
        } else if (isDescEditing) {
            descTextareaRef.current?.focus()
        } else if (isCommentEditing) { // Focus on comment textarea when editing
            commentTextareaRef.current?.focus()
        }
    }, [isNameEditing, isDescEditing, isCommentEditing])

    function handleCheck() {
        const newStatus = !isChecked
        setIsChecked(newStatus)

        updateTask(task._id, { closed: newStatus })
    }

    function handleChange(ev) {
        const field = ev.target.name;
        const value = ev.target.value;

        if (field === "name") {
            setTaskName(value)
        }

        if (field === "desc") {
            setTaskDescription(value)
        }

        if (field === "comment") {
            setCommentText(value)
        }
    }

    function updateTask(taskId, updatedFields) {
        updateBoard({
            ...board,
            tasks: board.tasks.map(task =>
                task._id === taskId
                    ? { ...task, ...updatedFields }
                    : task
            )
        })
    }

    function onUpdateTask(taskId, field, value) {
        updateTask(taskId, { [field]: value })
    }

    function onDescriptionSubmit(ev) {
        ev.preventDefault()
        setIsDescEditing(false)
        onUpdateTask(task._id, "desc", taskDescription)
    }

    function onNameBlur() {
        setIsNameEditing(false)
        onUpdateTask(task._id, "name", taskName)
    }

    function onNameKeyDown(ev) {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            ev.target.blur()
        }
        if (ev.key === 'Escape') {
            setTaskName(task.name)
            setIsNameEditing(false)
        }
    }

    function onCommentSubmit(ev) {
        ev.preventDefault()
        if (!commentText.trim()) {
            setIsCommentEditing(false)
            return
        }

        // Example structure for a new comment
        const newComment = {
            _id: makeId(),
            data: {
                idTask: task._id,
                text: commentText
            },
            date: Date.now(),
            type: "commentTask",
            memberCreator: {
                fullName: "Oxana Shvartzman",
                avatarUrl: "images/avatars/OS-avatar.png",
                username: "oxanashvartzman"
            }
        }

        const updatedComments = [...(board.actions || []), newComment];
        onUpdateTask(task._id, "actions", updatedComments)

        // Assuming you have an 'comments' array on the task:
        // const updatedComments = [...(task.comments || []), newComment];
        // updateTask(task._id, { comments: updatedComments });


        setCommentText("") // Clear the input
        setIsCommentEditing(false)
    }

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
                        <div className="task-icon" onClick={handleCheck}>
                            {isChecked
                                ? <span style={{ color: "#6A9A23" }} title="Mark incomplete"><CircleCheckIcon width={16} height={16} fill="currentColor" /></span>
                                : <span title="Mark complete"><CircleIcon width={16} height={16} fill="currentColor" /></span>}
                        </div>
                        {/* TODO: implement reusable component for editable field */}
                        {!isNameEditing &&
                            <h2
                                onClick={() => setIsNameEditing(true)}
                            >
                                {taskName}
                            </h2>}
                        {isNameEditing &&
                            <input
                                ref={nameInputRef}
                                type="text"
                                name="name"
                                value={taskName}
                                onChange={handleChange}
                                onBlur={onNameBlur}
                                onKeyDown={onNameKeyDown}
                            />}
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
                            <h3 className="heading">Votes</h3>
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
                            <h3 className="heading">Description</h3>
                            <div></div>
                            {(task.desc && !isDescEditing) && <p onClick={() => setIsDescEditing(true)}>{task.desc}</p>}
                            {(!task.desc && !isDescEditing) &&
                                <button
                                    className="add-description-btn"
                                    onClick={() => setIsDescEditing(true)}
                                >
                                    Add a more detailed description
                                </button>}
                            {/* TODO: implement reusable component for editable field */}
                            {isDescEditing && <form onSubmit={onDescriptionSubmit}>
                                <textarea
                                    ref={descTextareaRef}
                                    className="edit-description"
                                    name="desc"
                                    value={taskDescription}
                                    onChange={handleChange}
                                    placeholder="Add a more detailed description">
                                </textarea>
                                <div className="edit-description-actions">
                                    <button
                                        className="btn-primary"
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="dynamic-btn"
                                        type="button"
                                        onClick={() => {
                                            setTaskDescription(task.desc || "")
                                            setIsDescEditing(false)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>}
                        </section>
                    </div>
                </main>
                <aside>
                    <section className="task-grid-container">
                        <div className="task-icon">
                            <CommentText width={16} height={16} fill="currentColor" />
                        </div>
                        <h3 className="heading">Comments and activities</h3>
                        <div></div>
                        {/* TODO: implement reusable component for editable field */}
                        {comments.map((action, idx) => {
                            return (
                                <>
                                    {
                                        (!isCommentEditing) &&
                                        <textarea
                                            className="add-comment-textarea add-description-btn"
                                            placeholder="Write a comment..."
                                            onClick={() => setIsCommentEditing(true)}
                                            readOnly
                                        ></textarea>
                                    }
                                    {
                                        isCommentEditing && <form onSubmit={onCommentSubmit}>
                                            <textarea
                                                ref={commentTextareaRef}
                                                className="edit-comment edit-description"
                                                name="comment"
                                                value={commentText}
                                                onChange={handleChange}
                                                placeholder="Write a comment...">
                                            </textarea>
                                            <div className="edit-comment-actions edit-description-actions">
                                                <button
                                                    className="btn-primary"
                                                    type="submit"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="dynamic-btn"
                                                    type="button"
                                                    onClick={() => {
                                                        setCommentText("")
                                                        setIsCommentEditing(false)
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    }
                                    <div></div>
                                </>
                            )
                        })

                        }
                    </section>
                </aside>
            </div>
        </dialog>
    )
}