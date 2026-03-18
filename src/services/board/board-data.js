
export const board = [
    {
        "_id": "68e8092c100aad2a6c23f961",
        "name": "Trellis Agile Sprint Board",
        "desc": "Move fast without losing sight by adopting an agile workflow that gives your team perspective during any project management situation.\n\n- Keep all code, specs, and plans easily accessible in one location for more organized product development.\n- Collaborate seamlessly with engineers, product and scrum masters.\n- Manage and prioritize the product backlog with stakeholders and product managers.\n- Easily share what’s shipped and what’s up next with stakeholders.",
        "closed": false,
        "dateClosed": null,
        "isStarred": false,
        "prefs": {
            "background": "rgb(152,160,126)",
            "backgroundImage": "https://res.cloudinary.com/da9naclpy/image/upload/v1766337287/u8exyutohadffr5ox2vn.webp",
        },
        "labelNames": {
            "green": "Meta",
            "yellow": "Verified on branch",
            "orange": "Bugs",
            "red": "Blocked",
            "purple": "Regression",
            "blue": "Verified on staging",
            "sky": "New Team / boards tab",
            "lime": "",
            "pink": "",
            "black": "Security Issue",
            "green_dark": "",
            "yellow_dark": "",
            "orange_dark": "",
            "red_dark": "",
            "purple_dark": "",
            "blue_dark": "",
            "sky_dark": "",
            "lime_dark": "",
            "pink_dark": "",
            "black_dark": "",
            "green_light": "",
            "yellow_light": "",
            "orange_light": "",
            "red_light": "",
            "purple_light": "",
            "blue_light": "",
            "sky_light": "",
            "lime_light": "",
            "pink_light": "",
            "black_light": ""
        },
        "dateLastActivity": "2025-10-09T20:47:13.204Z",
        "dateLastView": "2025-10-09T20:47:13.291Z",
        "idMemberCreator": "5eafad22c718790469a3db7a",
        "actions": [
            {
                "_id": "68e8195da4c9f405818b0ce5",
                "idMemberCreator": "5eafad22c718790469a3db7a",
                "data": {
                    "idTask": "68e8092c100aad2a6c23f9d5",
                    "text": "@Developers - We are now enforcing the 'Mobile First' approach for all new CSS cards. Before requesting review, please ensure the mobile styles are complete and verified. Added a new step to the 'Code Review' checklist.",
                    "task": {
                        "_id": "68e8092c100aad2a6c23f9d5",
                        "name": "(21) Update CSS"
                    },
                    "board": {
                        "_id": "68e8092c100aad2a6c23f961",
                        "name": "Trellist Agile Sprint Board"
                    },
                    "list": {
                        "_id": "68e8092c100aad2a6c23f95e",
                        "name": "In Progress"
                    }
                },
                "type": "commentTask",
                "date": "2025-10-09T20:21:49.478Z",
                "memberCreator": {
                    "_id": "5eafad22c718790469a3db7a",
                    "avatarUrl": "https://res.cloudinary.com/da9naclpy/image/upload/v1765662607/OS-avatar_nr1jfr.png",
                    "fullName": "Oxana Shvartzman",
                    "initials": "OS",
                    "username": "oxanashvartzman"
                }
            },
            {
                "_id": "68e8195086985f1244c2a6fd",
                "idMemberCreator": "5eafad22c718790469a3db7a",
                "data": {
                    "idTask": "68e8092c100aad2a6c23f9d5",
                    "text": "@UX Team - Just a reminder that all CSS updates for the main application (as per the v2.0 design spec) are now scheduled for the next sprint. Please ensure all design files are finalized by EOD Friday.",
                    "task": {
                        "_id": "68e8092c100aad2a6c23f9d5",
                        "name": "(21) Update CSS"
                    },
                    "board": {
                        "_id": "68e8092c100aad2a6c23f961",
                        "name": "Trellist Agile Sprint Board"
                    },
                    "list": {
                        "_id": "68e8092c100aad2a6c23f95e",
                        "name": "In Progress"
                    }
                },
                "type": "commentTask",
                "date": "2025-10-09T20:21:36.782Z",
                "memberCreator": {
                    "_id": "5eafad22c718790469a3db7a",
                    "avatarUrl": "https://res.cloudinary.com/da9naclpy/image/upload/v1765662607/OS-avatar_nr1jfr.png",
                    "fullName": "Oxana Shvartzman",
                    "initials": "OS",
                    "username": "oxanashvartzman"
                }
            },
            {
                "_id": "2sEp8Q",
                "data": {
                    "idTask": "68e8092c100aad2a6c23f9bd",
                    "text": "@pm_alex: Glad we're moving forward with this. User feedback from the last alpha showed that people were confused by the pop-over; they kept trying to click the tag to find related boards. Let’s make sure there is a clear \"X\" or \"Clear Filter\" button that appears once the filter is active so they don't get stuck!"
                },
                "date": 1765978264792,
                "type": "commentTask",
                "memberCreator": {
                    "fullName": "Anna Coss",
                    "avatarUrl": "",
                    "username": "annacoss",
                    "initials": "AC"
                }
            },
            {
                "_id": "TJahsk",
                "data": {
                    "idTask": "68e8092c100aad2a6c23f9bd",
                    "text": "@dev_lara: I'll handle the state logic for this. Instead of just filtering in local state, I’m going to push the collection ID to the URL as a query param (e.g., ?filter=collection_id). This way, users can bookmark a filtered view or share it with their teammates. @ui_design, should the tag have a hover state to indicate it’s now a filter link?"
                },
                "date": 1765978276499,
                "type": "commentTask",
                "memberCreator": {
                    "fullName": "Anna Coss",
                    "avatarUrl": "",
                    "username": "annacoss",
                    "initials": "AC"
                }
            },
            {
                "_id": "e5lAM0",
                "data": {
                    "idTask": "68e8092c100aad2a6c23f9bd",
                    "text": "@qa_sam: Just a heads-up: make sure we test this on boards that belong to multiple collections. If I click one, does it add to the filter (AND logic) or replace the current filter? Also, we should verify that clicking the tag while the card is being dragged doesn't trigger the filter by accident."
                },
                "date": 1765978330258,
                "type": "commentTask",
                "memberCreator": {
                    "fullName": "Anna Coss",
                    "avatarUrl": "",
                    "username": "annacoss",
                    "initials": "AC"
                }
            },
            {
                "_id": "h8P1xw",
                "data": {
                    "idTask": "68e8092c100aad2a6c23f9cf",
                    "text": "@tech_lead_jason: We need to be careful with the API payload here. We should only send the board name and id for these \"Other Private Boards.\" Don't include sensitive metadata like member lists or recent activity until the user actually has permission to view the board content."
                },
                "date": 1765978413687,
                "type": "commentTask",
                "memberCreator": {
                    "fullName": "Anna Coss",
                    "avatarUrl": "",
                    "username": "annacoss",
                    "initials": "AC"
                }
            },
            {
                "_id": "XR4sqg",
                "data": {
                    "idTask": "68e8092c100aad2a6c23f9cf",
                    "text": "@design_claire: I’ve added a mockup in Figma for this. These boards should look \"faded\" or have a small padlock icon next to the title to differentiate them from the boards the user is already active in. Let's use a 50% opacity for the board tile backgrounds."
                },
                "date": 1765978428016,
                "type": "commentTask",
                "memberCreator": {
                    "fullName": "Anna Coss",
                    "avatarUrl": "",
                    "username": "annacoss",
                    "initials": "AC"
                }
            },
            {
                "_id": "birMpp",
                "data": {
                    "idTask": "68e8092c100aad2a6c23f9c1",
                    "text": "@frontend_dev: This will clean up a lot of logic on our end. Currently, we’re trying to parse titles from URLs manually, which is prone to errors. If the backend can handle the heavy lifting of fetching metadata (like OpenGraph titles) and just return the default_name, the UI will feel much more consistent."
                },
                "date": 1765979700005,
                "type": "commentTask",
                "memberCreator": {
                    "fullName": "Anna Coss",
                    "avatarUrl": "",
                    "username": "annacoss",
                    "initials": "AC"
                }
            },
            {
                "_id": "oPD3AQ",
                "data": {
                    "idTask": "68e8092c100aad2a6c23f9c1",
                    "text": "@backend_node: I’m implementing a service to handle this. When a URL is passed, the server will ping the endpoint, check for a <title> tag or og:title, and fallback to a \"New Task\" string if the site blocks scrapers. Should we also include the site's favicon as a default attachment while we're at it?"
                },
                "date": 1765979710245,
                "type": "commentTask",
                "memberCreator": {
                    "fullName": "Anna Coss",
                    "avatarUrl": "",
                    "username": "annacoss",
                    "initials": "AC"
                }
            },
            {
                "_id": "kjyfH3",
                "data": {
                    "idTask": "68e8092c100aad2a6c23f9c1",
                    "text": "@backend_node: I’m implementing a service to handle this. When a URL is passed, the server will ping the endpoint, check for a <title> tag or og:title, and fallback to a \"New Task\" string if the site blocks scrapers. Should we also include the site's favicon as a default attachment while we're at it?"
                },
                "date": 1765979723721,
                "type": "commentTask",
                "memberCreator": {
                    "fullName": "Anna Coss",
                    "avatarUrl": "",
                    "username": "annacoss",
                    "initials": "AC"
                }
            }
        ],
        "tasks": [
            {
                "_id": "68e8092c100aad2a6c23f9db",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T20:00:26.086Z",
                "dateCompleted": null,
                "desc": "",
                "due": null,
                "idBoard": "68e8092c100aad2a6c23f961",
                "idGroup": "68e8092c100aad2a6c23f95c",
                "idMemberCreator": null,
                "idMembers": [],
                "idAttachmentCover": "hVRlWC",
                "labels": [
                    {
                        "_id": "68e8092c100aad2a6c23fa34",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Meta",
                        "color": "green"
                    },
                    {
                        "_id": "68e8092c100aad2a6c23fa3a",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Verified on branch",
                        "color": "yellow"
                    },
                    {
                        "_id": "68e8092c100aad2a6c23fa36",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Bugs",
                        "color": "orange"
                    },
                    {
                        "_id": "68e8092c100aad2a6c23fa38",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Blocked",
                        "color": "red"
                    },
                    {
                        "_id": "68e8092c100aad2a6c23fa37",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Regression",
                        "color": "purple"
                    }
                ],
                "name": "Product Owner: Brian",
                "start": null,
                "cover": {
                    "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765219243/aercq9pxdzic5wmzoeem.jpg",
                    "edgeColor": "rgb(212, 215, 220)",
                    "idAttachment": "hVRlWC"
                },
                "attachments": [
                    {
                        "_id": "hVRlWC",
                        "date": 1765219245212,
                        "edgeColor": "#d4d7dc",
                        "idMember": "",
                        "isUpload": true,
                        "mimeType": "image/jpg",
                        "name": "brain.jpg",
                        "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765219243/aercq9pxdzic5wmzoeem.jpg"
                    }
                ]
            },
            {
                "_id": "68e8092c100aad2a6c23f9c7",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T20:16:47.782Z",
                "dateCompleted": null,
                "desc": "Improve the user experience by implementing a pre-loading strategy for task attachments. Currently, users experience a slight delay or \"flicker\" when opening a task card as images and documents fetch from the server. This task aims to fetch attachment metadata (and thumbnails where applicable) in the background when a user hovers over a card or when the board initially loads.",
                "due": null,
                "idBoard": "68e8092c100aad2a6c23f961",
                "idGroup": "68e8092c100aad2a6c23f95c",
                "idMemberCreator": null,
                "idMembers": [],
                "idAttachmentCover": null,
                "labels": [
                    {
                        "_id": "VS7EbM",
                        "name": "Web",
                        "color": "green"
                    }
                ],
                "name": "Pre-load task attachments",
                "start": null,
                "cover": {
                    "idAttachment": null,
                    "color": null,
                    "idUploadedBackground": null
                },
                "attachments": [],
                "idLabels": [
                    "VS7EbM"
                ]
            },
            {
                "_id": "68e8092c100aad2a6c23f9bf",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T19:12:44.931Z",
                "dateCompleted": null,
                "desc": "Implement a system for \"Renderable Actions\"—a standardized schema for backend-driven events that the frontend can automatically transform into interactive UI components. Instead of hard-coding every possible user notification or prompt, the app will receive an \"action\" object and render the appropriate UI (e.g., a \"Join Board\" button, a \"Confirm Email\" banner, or an \"Undo\" toast).",
                "due": null,
                "idBoard": "68e8092c100aad2a6c23f961",
                "idGroup": "68e8092c100aad2a6c23f95c",
                "idMemberCreator": null,
                "idMembers": [],
                "idAttachmentCover": null,
                "labels": [
                    {
                        "_id": "uZ1MIt",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Core / Infrastructure",
                        "color": "subtle blue"
                    }
                ],
                "name": "Renderable action",
                "start": null,
                "cover": {
                    "idAttachment": null,
                    "color": null,
                    "idUploadedBackground": null
                },
                "attachments": [],
                "idLabels": [
                    "uZ1MIt"
                ]
            },
            {
                "_id": "68e8092c100aad2a6c23f9d7",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T19:12:44.941Z",
                "dateCompleted": null,
                "desc": "Restore or implement the industry-standard J and K keyboard shortcuts for navigating between task cards. In many productivity tools (like Gmail, Jira, and the original Trello), J moves the selection down/next, and K moves the selection up/previous.",
                "due": null,
                "idBoard": "68e8092c100aad2a6c23f961",
                "idGroup": "68e8092c100aad2a6c23f95c",
                "idMemberCreator": null,
                "idMembers": [],
                "idAttachmentCover": null,
                "labels": [
                    {
                        "_id": "68e8092c100aad2a6c23fa38",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Blocked",
                        "color": "red"
                    }
                ],
                "name": "J/K Keyboard Shortcuts Disabled",
                "start": null,
                "cover": {
                    "idAttachment": null,
                    "color": null,
                    "idUploadedBackground": null
                },
                "attachments": [],
                "idLabels": [
                    "68e8092c100aad2a6c23fa38"
                ]
            },
            {
                "_id": "68e8092c100aad2a6c23f9c9",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T19:12:45.105Z",
                "dateCompleted": null,
                "desc": "The /org/:id url doesn't currently work, you get a Page not Found error.",
                "due": null,
                "idBoard": "68e8092c100aad2a6c23f961",
                "idGroup": "68e8092c100aad2a6c23f95c",
                "idMemberCreator": null,
                "idMembers": [],
                "idAttachmentCover": null,
                "labels": [
                    {
                        "_id": "6cZ47x",
                        "name": "Bugs",
                        "color": "orange"
                    },
                    {
                        "_id": "kNM81p",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Regression",
                        "color": "purple"
                    }
                ],
                "name": "Fix /org/:id route",
                "start": null,
                "cover": {
                    "idAttachment": null,
                    "color": null,
                    "idUploadedBackground": null
                },
                "attachments": [],
                "idLabels": [
                    "6cZ47x",
                    "kNM81p"
                ]
            },
            {
                "_id": "68e8092c100aad2a6c23f9bd",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T20:17:16.087Z",
                "dateCompleted": null,
                "desc": "Update the click behavior for collection tags located underneath board titles. Currently, clicking a collection opens a pop-over menu. The desired behavior is for the click to act as a global filter, instantly updating the board list to show only boards belonging to that specific collection.",
                "due": "2025-12-30T13:29:00.000Z",
                "idBoard": "68e8092c100aad2a6c23f961",
                "idGroup": "68e8092c100aad2a6c23f95d",
                "idMemberCreator": null,
                "idMembers": [
                    "5eafad22c718790469a3db7a",
                    "68e809da40f4d09300719d2d"
                ],
                "idAttachmentCover": null,
                "labels": [
                    {
                        "_id": "68e8092c100aad2a6c23fa39",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "New Team / boards tab",
                        "color": "sky"
                    }
                ],
                "name": "Clicking the collection beneath a board should filter by collection, not open collections pop-over",
                "start": null,
                "cover": {
                    "idAttachment": null,
                    "color": null,
                    "idUploadedBackground": null
                },
                "attachments": [],
                "idLabels": [
                    "68e8092c100aad2a6c23fa39"
                ],
                "dueTime": "3:29 PM"
            },
            {
                "_id": "68e8092c100aad2a6c23f9cf",
                "closed": false,
                "dueComplete": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T20:20:14.194Z",
                "dateCompleted": null,
                "desc": "in `bobby/show-other-private-boards`\n\n---- \n\nHide other member's private boards by default and adds a toggle for showing other people's private boards at the bottom of the team boards page filter (liek the screenshot)",
                "due": "2025-12-28T13:35:00.000Z",
                "idBoard": "68e8092c100aad2a6c23f961",
                "idLabels": [],
                "idGroup": "68e8092c100aad2a6c23f95d",
                "idMemberCreator": null,
                "idMembers": [
                    "68e809da40f4d09300719d2d"
                ],
                "idAttachmentCover": null,
                "labels": [
                    {
                        "_id": "gU4YhG",
                        "name": "New Team / boards tab",
                        "color": "sky"
                    }
                ],
                "name": "BC3 team boards page: Show Other Private Boards",
                "originalDesc": "",
                "start": null,
                "cover": {
                    "coverColor": "red"
                },
                "attachments": [],
                "dueTime": "3:35 PM"
            },
            {
                "_id": "68e8092c100aad2a6c23f9bb",
                "closed": false,
                "cover": {
                    "idAttachment": "xxw2Fd",
                    "edgeColor": "#FFFFFF",
                    "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765196831/gxe6lrpd3ryspopgap8x.png"
                },
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T19:48:36.634Z",
                "dateCompleted": null,
                "desc": "Implement post-message-io, a wrapper around the native window.postMessage API, to facilitate secure and structured communication between the main application and nested iframes or cross-origin windows. This is essential for features that require external integrations (like power-ups or third-party embeds) to talk back to the Trello clone safely.\n\nThe Problem\nNative window.postMessage is often messy to manage, requiring manual event listener cleanup and complex \"origin\" checks to prevent security vulnerabilities. As we add more interactive third-party components, we need a robust, promise-based request/response pattern for cross-window communication.",
                "due": "2025-12-26T13:37:00.000Z",
                "idAttachmentCover": "xxw2Fd",
                "idBoard": "68e8092c100aad2a6c23f961",
                "idLabels": [
                    "68e8092c100aad2a6c23fa32"
                ],
                "idGroup": "68e8092c100aad2a6c23f95d",
                "idMemberCreator": null,
                "idMembers": [
                    "68e809da40f4d09300719d2d"
                ],
                "labels": [
                    {
                        "_id": "68e8092c100aad2a6c23fa32",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Security Issue",
                        "color": "black"
                    }
                ],
                "name": "Add post-message-io",
                "start": null,
                "attachments": [
                    {
                        "_id": "xxw2Fd",
                        "date": 1765196832771,
                        "edgeColor": "#FFFFFF",
                        "idMember": "",
                        "isUpload": true,
                        "mimeType": "image/png",
                        "name": "npm.png",
                        "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765196831/gxe6lrpd3ryspopgap8x.png"
                    }
                ],
                "dueTime": "3:37 PM"
            },
            {
                "_id": "68e8092c100aad2a6c23f9b9",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T19:44:03.428Z",
                "dateCompleted": null,
                "desc": "Plan\n\n- migrate all existing 'EditableView' code to use 'EditableFieldView'\n- clean up all the now-unnecessary code that we can eliminate with 'EditableView' out of our lives\n- get 'EditableFieldView' up to feature parity with 'EditableView'\n- test, test, test\n- ship a version of the app that uses 'EditableFieldView' for current fields, but no new ones, to ensure everything is stable\n- extend 'EditableFieldView' with new features to support non-field-backed-inputs\n- convert comment editing, comment authoring, and checkitem authoring to use 'EditableFieldView'\n- test, test, test\n- ship\n\n Phase 1 (done)\n\n- task name (done)\n- task description (done)\n- checklist name (done)\n- checkitem name (done)\n- board description (done)\n- group name (done)\n\n Phase 2\n\n- 'Layout.isEditing'\n- 'Layout.cancelEdits'\n- 'js-no-higher-edits'\n- keepEdits\n\n Phase 3\n\n- special handling for fields that shouldn't be empty\n- special handling for 'single-line' fields\n    - some which can't contain newlines at all (checkitem), others require shift-enter\n- 'text is too long' error message\n- click-away behavior and X button behavior are currently different\n- only one field should be editable at a time\n- 'TaskDetailView::editTitle'\n- 'AutoInsertionView' and 'CompleterUtil'\n- escape behavior (done)\n\n Bugs\n\n- all the CSS is wrong\n- group title selection is being broken by something dumb higher in the propagation\n\n Intentional changes\n\n- you can no longer edit the board name from the board description dialog\n- the board description view has the same format helper as the task description, instead of a link to Gruber's markdown page\n- editing the task name no longer triggers the editing typing indicator",
                "due": "2026-01-02T13:39:00.000Z",
                "idBoard": "68e8092c100aad2a6c23f961",
                "idLabels": [
                    "68e8092c100aad2a6c23fa3a",
                    "7bMFoQ",
                    "wQu9BD"
                ],
                "idGroup": "68e8092c100aad2a6c23f95e",
                "idMemberCreator": null,
                "idMembers": [
                    "5eafad22c718790469a3db7a"
                ],
                "idAttachmentCover": null,
                "labels": [
                    {
                        "_id": "68e8092c100aad2a6c23fa3a",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Verified on branch",
                        "color": "yellow"
                    },
                    {
                        "_id": "7bMFoQ",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Meta",
                        "color": "green"
                    },
                    {
                        "_id": "wQu9BD",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Regression",
                        "color": "purple"
                    }
                ],
                "name": "EditableFieldView",
                "start": null,
                "cover": {
                    "idAttachment": null,
                    "color": null,
                    "idUploadedBackground": null
                },
                "attachments": [],
                "dueTime": "3:39 PM"
            },
            {
                "_id": "68e8092c100aad2a6c23f9d5",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T20:42:30.900Z",
                "dateCompleted": null,
                "desc": "",
                "due": "2026-01-29T13:40:00.000Z",
                "idBoard": "68e8092c100aad2a6c23f961",
                "idLabels": [
                    "68e8092c100aad2a6c23fa38",
                    "WF1Zqf"
                ],
                "idGroup": "68e8092c100aad2a6c23f95e",
                "idMemberCreator": null,
                "idMembers": [
                    "5eafad22c718790469a3db7a",
                    "68e809da40f4d09300719d2d"
                ],
                "idAttachmentCover": "qDYCU9",
                "labels": [
                    {
                        "_id": "68e8092c100aad2a6c23fa38",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Blocked",
                        "color": "red"
                    },
                    {
                        "_id": "WF1Zqf",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Web",
                        "color": "green"
                    }
                ],
                "name": "Update CSS",
                "start": "2025-10-05T21:00:00.000Z",
                "cover": {
                    "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765219365/lo6svl2txcgyjj5vzpen.jpg",
                    "edgeColor": "rgb(35, 21, 23)",
                    "idAttachment": "qDYCU9"
                },
                "attachments": [
                    {
                        "_id": "qDYCU9",
                        "date": 1765219367287,
                        "edgeColor": "#231517",
                        "idMember": "",
                        "isUpload": true,
                        "mimeType": "image/jpg",
                        "name": "code.jpg",
                        "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765219365/lo6svl2txcgyjj5vzpen.jpg"
                    }
                ],
                "dueTime": "3:40 PM"
            },
            {
                "_id": "68e8092c100aad2a6c23f9cd",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T19:44:45.509Z",
                "dateCompleted": null,
                "desc": "https://trello.com/c/oBABf3ot/35-woah-need-to-make-a-gif-for-the-new-drag-drop-feature",
                "due": "2026-01-10T13:42:00.000Z",
                "idBoard": "68e8092c100aad2a6c23f961",
                "idLabels": [],
                "idGroup": "68e8092c100aad2a6c23f95e",
                "idMemberCreator": null,
                "idMembers": [
                    "68e809da40f4d09300719d2d"
                ],
                "idAttachmentCover": null,
                "labels": [],
                "name": "Show collection helper text in collections menu",
                "start": null,
                "cover": {
                    "idAttachment": null,
                    "color": null,
                    "idUploadedBackground": null
                },
                "attachments": [],
                "dueTime": "3:42 PM"
            },
            {
                "_id": "68e8092c100aad2a6c23f9c1",
                "closed": true,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T20:47:13.204Z",
                "dateCompleted": "2025-10-09T20:47:13.200Z",
                "desc": "Shift the responsibility of naming new tasks created via URL from the client-side to the server-side. Instead of the frontend attempting to parse a URL or defaulting to \"New Task,\" the backend will proactively fetch the page metadata to generate a relevant, context-aware title.",
                "due": "2025-12-16T13:48:00.000Z",
                "idBoard": "68e8092c100aad2a6c23f961",
                "idLabels": [
                    "68e8092c100aad2a6c23fa36"
                ],
                "idGroup": "68e8092c100aad2a6c23f95f",
                "idMemberCreator": null,
                "idMembers": [
                    "5eafad22c718790469a3db7a"
                ],
                "idAttachmentCover": "7KOCcz",
                "labels": [
                    {
                        "_id": "68e8092c100aad2a6c23fa36",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Bugs",
                        "color": "orange"
                    }
                ],
                "name": "Let the server choose the default name when creating a task from a URL",
                "start": null,
                "cover": {
                    "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765213770/dmhm530s5tpxvxc1tyqq.webp",
                    "edgeColor": "rgb(77, 134, 59)",
                    "idAttachment": "7KOCcz"
                },
                "attachments": [
                    {
                        "_id": "uMJR4f",
                        "date": 1765222435950,
                        "edgeColor": "#a9a399",
                        "idMember": "",
                        "isUpload": true,
                        "mimeType": "image/jpg",
                        "name": "sprint-review.jpg",
                        "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765222435/fpxpgw2dvmozfmkehw7i.jpg"
                    },
                    {
                        "_id": "7KOCcz",
                        "date": 1765222459559,
                        "edgeColor": "#4d863b",
                        "idMember": "",
                        "isUpload": true,
                        "mimeType": "image/webp",
                        "name": "bug.webp",
                        "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765213770/dmhm530s5tpxvxc1tyqq.webp"
                    }
                ],
                "dueTime": "3:48 PM"
            },
            {
                "_id": "68e8092c100aad2a6c23f9c3",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T20:41:19.643Z",
                "dateCompleted": null,
                "desc": "in bobby/attachment-thumb-power-up-icon",
                "due": "2025-12-22T13:49:00.000Z",
                "idBoard": "68e8092c100aad2a6c23f961",
                "idGroup": "68e8092c100aad2a6c23f95f",
                "idMemberCreator": null,
                "idMembers": [],
                "idAttachmentCover": null,
                "labels": [],
                "name": "Plugins: attachment preview icon",
                "start": null,
                "cover": {
                    "coverColor": "yellow"
                },
                "attachments": [],
                "dueTime": "3:49 PM"
            },
            {
                "_id": "68e8092c100aad2a6c23f9c5",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T19:12:45.626Z",
                "dateCompleted": null,
                "desc": "bobby/boards-page-css\n\nRefactors the boards page markup. There are only two user facing changes:\n\n- The team boards page should be four columns wide instead of three on large screens.\n- The home boards page will not have the gutter. The header will be flush with the boards.\n\nWill need testing cross browser.",
                "due": "2025-12-23T07:00:00.000Z",
                "idBoard": "68e8092c100aad2a6c23f961",
                "idGroup": "68e8092c100aad2a6c23f95f",
                "idMemberCreator": null,
                "idMembers": [],
                "idAttachmentCover": null,
                "labels": [
                    {
                        "_id": "68e8092c100aad2a6c23fa33",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Verified on staging",
                        "color": "blue"
                    },
                    {
                        "_id": "IbkOel",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Web",
                        "color": "green"
                    }
                ],
                "name": "Decouple board page group CSS",
                "start": null,
                "cover": {
                    "idAttachment": null,
                    "color": null,
                    "idUploadedBackground": null
                },
                "attachments": [],
                "dueTime": "9:00 AM",
                "idLabels": [
                    "68e8092c100aad2a6c23fa33",
                    "IbkOel"
                ]
            },
            {
                "_id": "68e8092c100aad2a6c23f9d9",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T20:37:03.507Z",
                "dateCompleted": null,
                "desc": "- This sprint saw the release of the plugin infrastructure that was hindering 3rd party integrations.\n\n- Unfortunately, time was cut short on some design elements that needed to be pushed to next week's sprint.  Will update the backlog accordingly.\n\n- For the next sprint we will be more mindful of the number of story points in the Sprint Backlog due to our reduced team size with Henry's paternity leave over the next 3 months.\n\n",
                "due": "2026-01-14T13:51:00.000Z",
                "idBoard": "68e8092c100aad2a6c23f961",
                "idGroup": "68e8092c100aad2a6c23f960",
                "idMemberCreator": null,
                "idMembers": [
                    "68e809da40f4d09300719d2d",
                    "5eafad22c718790469a3db7a"
                ],
                "labels": [
                    {
                        "_id": "acGaww",
                        "idBoard": "68e8092c100aad2a6c23f961",
                        "name": "Milestone",
                        "color": "subtle purple"
                    }
                ],
                "name": "👍 Sprint Review 👎",
                "originalDesc": "",
                "originalName": "",
                "start": null,
                "cover": {
                    "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765222435/fpxpgw2dvmozfmkehw7i.jpg",
                    "edgeColor": "rgb(169, 163, 153)",
                    "idAttachment": "QljSnV"
                },
                "attachments": [
                    {
                        "_id": "QljSnV",
                        "date": 1765222909115,
                        "edgeColor": "#a9a399",
                        "idMember": "",
                        "isUpload": true,
                        "mimeType": "image/jpg",
                        "name": "sprint-review.jpg",
                        "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765222435/fpxpgw2dvmozfmkehw7i.jpg"
                    }
                ],
                "idAttachmentCover": "QljSnV",
                "dueTime": "3:51 PM",
                "idLabels": [
                    "acGaww"
                ]
            },
            {
                "_id": "68e8092c100aad2a6c23f9cb",
                "closed": true,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T20:46:36.536Z",
                "dateCompleted": null,
                "desc": "",
                "due": "2026-01-04T13:59:00.000Z",
                "idBoard": "68e8092c100aad2a6c23f961",
                "idGroup": "68e8092c100aad2a6c23f960",
                "idMemberCreator": null,
                "idMembers": [
                    "5eafad22c718790469a3db7a"
                ],
                "idAttachmentCover": null,
                "labels": [
                    {
                        "_id": "VS7EbM",
                        "name": "Meta",
                        "color": "green"
                    },
                    {
                        "_id": "TguBnS",
                        "name": "",
                        "color": "yellow"
                    },
                    {
                        "_id": "6cZ47x",
                        "name": "",
                        "color": "orange"
                    },
                    {
                        "_id": "yU3xHq",
                        "name": "",
                        "color": "red"
                    },
                    {
                        "_id": "9CxMTV",
                        "name": "",
                        "color": "purple"
                    },
                    {
                        "_id": "gU4YhG",
                        "name": "",
                        "color": "sky"
                    },
                    {
                        "_id": "9O4AFL",
                        "name": "",
                        "color": "blue"
                    },
                    {
                        "_id": "n2e8L1",
                        "name": "",
                        "color": "lime"
                    },
                    {
                        "_id": "LltI37",
                        "name": "",
                        "color": "pink"
                    },
                    {
                        "_id": "oBvIzn",
                        "name": "",
                        "color": "black"
                    }
                ],
                "name": "Restore hidden short ids (or don't, up to you)",
                "start": null,
                "cover": {
                    "idAttachment": null,
                    "color": null,
                    "idUploadedBackground": null
                },
                "attachments": [],
                "idLabels": [
                    "VS7EbM"
                ],
                "dueTime": "3:59 PM"
            },
            {
                "_id": "68e8092c100aad2a6c23f9d1",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T19:52:44.076Z",
                "dateCompleted": null,
                "desc": "",
                "due": "2026-01-06T13:59:00.000Z",
                "idBoard": "68e8092c100aad2a6c23f961",
                "idGroup": "68e8092c100aad2a6c23f960",
                "idMemberCreator": null,
                "idMembers": [
                    "68e809da40f4d09300719d2d"
                ],
                "idMembersVoted": [],
                "idAttachmentCover": null,
                "labels": [],
                "name": "Button color clean up",
                "start": null,
                "cover": {
                    "coverColor": null
                },
                "attachments": [],
                "dueTime": "3:59 PM"
            },
            {
                "_id": "68e8092c100aad2a6c23f9d3",
                "closed": false,
                "dateClosed": null,
                "dateLastActivity": "2025-10-09T19:12:45.105Z",
                "dateCompleted": null,
                "desc": "in plugins-icon-size-and-color-beta\n\nhttps://trello.com/c/OyRU41XX/2258-fix-icon-sizes-and-colors-in-plugins but on top of pluginsbeta",
                "due": "2026-01-08T14:01:00.000Z",
                "idBoard": "68e8092c100aad2a6c23f961",
                "idCheckgroups": [],
                "idGroup": "68e8092c100aad2a6c23f960",
                "idMemberCreator": null,
                "idMembers": [
                    "5eafad22c718790469a3db7a",
                    "68e809da40f4d09300719d2d"
                ],
                "idAttachmentCover": null,
                "labels": [],
                "name": "Plugins(beta) icons and colors fixes",
                "start": null,
                "cover": {
                    "coverColor": "sky"
                },
                "attachments": [],
                "dueTime": "4:01 PM"
            }
        ],
        "labels": [
            {
                "_id": "68e8092c100aad2a6c23fa3a",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Verified on branch",
                "color": "yellow"
            },
            {
                "_id": "68e8092c100aad2a6c23fa37",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Regression",
                "color": "purple"
            },
            {
                "_id": "68e8092c100aad2a6c23fa33",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Verified on staging",
                "color": "blue"
            },
            {
                "_id": "68e8092c100aad2a6c23fa38",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Blocked",
                "color": "red"
            },
            {
                "_id": "68e8092c100aad2a6c23fa34",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Meta",
                "color": "green"
            },
            {
                "_id": "68e8092c100aad2a6c23fa39",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "New Team / boards tab",
                "color": "sky"
            },
            {
                "_id": "68e8092c100aad2a6c23fa36",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Bugs",
                "color": "orange"
            },
            {
                "_id": "68e8092c100aad2a6c23fa32",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Security Issue",
                "color": "black"
            },
            {
                "_id": "68e8092c100aad2a6c23fa35",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Web",
                "color": "green"
            },
            {
                "_id": "uZ1MIt",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Core / Infrastructure",
                "color": "subtle blue"
            },
            {
                "_id": "kNM81p",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Regression",
                "color": "purple"
            },
            {
                "_id": "acGaww",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Milestone",
                "color": "subtle purple"
            },
            {
                "_id": "7bMFoQ",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Meta",
                "color": "green"
            },
            {
                "_id": "wQu9BD",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Regression",
                "color": "purple"
            },
            {
                "_id": "WF1Zqf",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Web",
                "color": "green"
            },
            {
                "_id": "IbkOel",
                "idBoard": "68e8092c100aad2a6c23f961",
                "name": "Web",
                "color": "green"
            }
        ],
        "groups": [
            {
                "_id": "68e8092c100aad2a6c23f95c",
                "name": "Backlog",
                "closed": false,
                "idBoard": "68e8092c100aad2a6c23f961"
            },
            {
                "_id": "68e8092c100aad2a6c23f95d",
                "name": "Sprint Backlog",
                "closed": false,
                "idBoard": "68e8092c100aad2a6c23f961"
            },
            {
                "_id": "68e8092c100aad2a6c23f95e",
                "name": "In Progress",
                "closed": false,
                "idBoard": "68e8092c100aad2a6c23f961"
            },
            {
                "_id": "68e8092c100aad2a6c23f95f",
                "name": "30.12.25 Sprint - Complete",
                "closed": false,
                "idBoard": "68e8092c100aad2a6c23f961"
            },
            {
                "_id": "68e8092c100aad2a6c23f960",
                "name": "14.01.26 Sprint - Complete",
                "closed": false,
                "idBoard": "68e8092c100aad2a6c23f961"
            }
        ],
        "members": [
            {
                "_id": "68e809da40f4d09300719d2d",
                "avatarUrl": "https://res.cloudinary.com/da9naclpy/image/upload/v1773855391/AC_lkfc1u.jpg",
                "fullName": "Anna Coss",
                "initials": "AC",
                "username": "annacoss"
            },
            {
                "_id": "5eafad22c718790469a3db7a",
                "avatarUrl": "https://res.cloudinary.com/da9naclpy/image/upload/v1773855391/OR_jotrqa.jpg",
                "fullName": "Otto Ross",
                "initials": "OR",
                "username": "ottoross"
            }
        ],
        "uploadedImages": [
            {
                "_id": "uVv8Nd",
                "name": "stars",
                "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765735106/z5i5uutrebrvp4b28uho.jpg"
            },
            {
                "_id": "tF8d5I",
                "name": "field",
                "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765735150/gdhwp60ichb2gxadyls0.jpg"
            },
            {
                "_id": "ot1KjC",
                "name": "sea",
                "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765735160/sb3amqlb22titi2gbtan.jpg"
            },
            {
                "_id": "7ofx4p",
                "name": "trellis",
                "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1765735195/e4a2w4i2yfvs5unrjetq.webp"
            }
        ]
    },
    {
        "name": "Test",
        "closed": false,
        "isStarred": false,
        "prefs": {
            "background": "rgb(176, 187, 203)",
            "backgroundImage": "https://res.cloudinary.com/da9naclpy/image/upload/v1765289307/bubble_rh24m3.svg"
        },
        "idMemberCreator": "5eafad22c718790469a3db7a",
        "actions": [
            {
                "_id": "ys7Hf5",
                "data": {
                    "idTask": "ObNp9d",
                    "text": "Comment 1"
                },
                "date": 1773857688118,
                "type": "commentTask",
                "memberCreator": {
                    "fullName": "Anna Coss",
                    "avatarUrl": "",
                    "username": "annacoss",
                    "initials": "AC"
                }
            },
            {
                "_id": "oa5Uhn",
                "data": {
                    "idTask": "ObNp9d",
                    "text": "Comment 2"
                },
                "date": 1773857698608,
                "type": "commentTask",
                "memberCreator": {
                    "fullName": "Anna Coss",
                    "avatarUrl": "",
                    "username": "annacoss",
                    "initials": "AC"
                }
            }
        ],
        "groups": [
            {
                "_id": "4sOk7e",
                "idBoard": "9yRW3",
                "name": "Group 1"
            },
            {
                "_id": "Vui4T0",
                "idBoard": "9yRW3",
                "name": "Group 2"
            },
            {
                "_id": "zbHg1D",
                "idBoard": "9yRW3",
                "name": "Group 3"
            }
        ],
        "tasks": [
            {
                "_id": "LetEtZ",
                "idBoard": "9yRW3",
                "idGroup": "4sOk7e",
                "name": "Task 1_1",
                "closed": true
            },
            {
                "_id": "zpar5O",
                "idBoard": "9yRW3",
                "idGroup": "4sOk7e",
                "name": "Task 1_2",
                "cover": {
                    "coverColor": "green"
                },
                "idAttachmentCover": null
            },
            {
                "_id": "qTV1dL",
                "idBoard": "9yRW3",
                "idGroup": "4sOk7e",
                "name": "Task 1_3",
                "idAttachmentCover": "gTltP3",
                "cover": {
                    "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1773856957/test_pofhzl.jpg",
                    "edgeColor": "rgb(235,231,220)",
                    "idAttachment": "gTltP3"
                },
                "attachments": [
                    {
                        "_id": "va7VhO",
                        "date": 1773857480169,
                        "edgeColor": "rgb(187,209,235)",
                        "idMember": "",
                        "isUpload": true,
                        "mimeType": "image/jpg",
                        "name": "code.jpg",
                        "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1773857479/ptprbjejsoymfw76aek4.jpg"
                    },
                    {
                        "_id": "gTltP3",
                        "date": 1773857497622,
                        "edgeColor": "rgb(235,231,220)",
                        "idMember": "",
                        "isUpload": true,
                        "mimeType": "image/jpg",
                        "name": "test.jpg",
                        "url": "https://res.cloudinary.com/da9naclpy/image/upload/v1773856957/test_pofhzl.jpg"
                    }
                ]
            },
            {
                "_id": "JmFL0E",
                "idBoard": "9yRW3",
                "idGroup": "4sOk7e",
                "name": "Task 1_3",
                "idLabels": [
                    "A1VsSa",
                    "ZlcGfy"
                ]
            },
            {
                "_id": "dQ4R5Z",
                "idBoard": "9yRW3",
                "idGroup": "Vui4T0",
                "name": "Task 2_1",
                "due": "2026-03-17T17:47:00.000Z",
                "dueTime": "7:47 PM",
                "start": null
            },
            {
                "_id": "TKrv3g",
                "idBoard": "9yRW3",
                "idGroup": "Vui4T0",
                "name": "Task 2_2",
                "due": "2026-03-19T17:48:00.000Z",
                "dueTime": "7:48 PM",
                "start": null
            },
            {
                "_id": "O9eAyR",
                "idBoard": "9yRW3",
                "idGroup": "Vui4T0",
                "name": "Task 2_3",
                "due": "2026-03-27T16:49:00.000Z",
                "dueTime": "7:49 PM",
                "start": null
            },
            {
                "_id": "VL40zd",
                "idBoard": "9yRW3",
                "idGroup": "zbHg1D",
                "idMembers": ["68e809da40f4d09300719d2d"],
                "name": "Task 3_1"
            },
            {
                "_id": "ObNp9d",
                "idBoard": "9yRW3",
                "idGroup": "zbHg1D",
                "name": "Task 3_2",
                "desc": "Task 3_2 description",
            }
        ],
        "labels": [
            {
                "_id": "A1VsSa",
                "name": "",
                "color": "green"
            },
            {
                "_id": "1g1U34",
                "name": "",
                "color": "yellow"
            },
            {
                "_id": "Eng4uQ",
                "name": "",
                "color": "orange"
            },
            {
                "_id": "LkVv20",
                "name": "",
                "color": "red"
            },
            {
                "_id": "6dmk7X",
                "name": "",
                "color": "purple"
            },
            {
                "_id": "qQtUoh",
                "name": "",
                "color": "sky"
            },
            {
                "_id": "pSVzr7",
                "name": "",
                "color": "blue"
            },
            {
                "_id": "QssVqr",
                "name": "",
                "color": "lime"
            },
            {
                "_id": "VPkjAU",
                "name": "",
                "color": "pink"
            },
            {
                "_id": "b0iizR",
                "name": "",
                "color": "black"
            },
            {
                "_id": "ZlcGfy",
                "idBoard": "9yRW3",
                "name": "New Label",
                "color": "subtle green"
            }
        ],
        "members": [
            {
                "_id": "68e809da40f4d09300719d2d",
                "avatarUrl": "https://res.cloudinary.com/da9naclpy/image/upload/v1773855391/AC_lkfc1u.jpg",
                "fullName": "Anna Coss",
                "initials": "AC",
                "username": "annacoss"
            },
            {
                "_id": "5eafad22c718790469a3db7a",
                "avatarUrl": "https://res.cloudinary.com/da9naclpy/image/upload/v1773855391/OR_jotrqa.jpg",
                "fullName": "Otto Ross",
                "initials": "OR",
                "username": "ottoross"
            }
        ],
        "uploadedImages": [],
        "_id": "9yRW3"
    }
]