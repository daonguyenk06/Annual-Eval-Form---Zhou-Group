//Use this for type_of_input to prevent typos
export const inputTypes = {
    counter: "counter",
    number: "number",
    shortText: "text",
    longText: "textarea",
    select: "radio",
    checkbox: "checkbox",
    dropdown: "dropdown"
};

//Form layout
export let form_layout = {
    section_0: {
        title: "Research Objectives and Goals",
        subsections: {
            subsection_0: {
                title: "Overall Project Objective:",
                prompts: {
                    0: {
                        prompt: "Clearly describe the main goal of your research project.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "What is the expected impact of your research?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "What are the expected contributions to the lab and/or broader scientific community?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Specific Short-term Goals (3-6 months):",
                prompts: {
                    0: {
                        prompt: "List measurable objectives you plan to achieve in the short term (e.g., mastering a technique, completing a series of experiments, generating data, or writing a paper).",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe how these short-term goals align with the overall project objective.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "What are the specific milestones you aim to meet in this period?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_2: {
                title: "Long-term Goals (1-2 years):",
                prompts: {
                    0: {
                        prompt: "List your long-term objectives for the project.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "What do you hope to accomplish in the next year or more, and how will this contribute to your research and professional development?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_1: {
        title: "Research Methodology and Approach",
        subsections: {
            subsection_0: {
                title: "Techniques and Tools to be Used:",
                prompts: {
                    0: {
                        prompt: "List the key materials science techniques, methods, and equipment you will use in your research.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "What are the technical challenges you anticipate, and how will you overcome them?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Data Collection and Analysis Plans:",
                prompts: {
                    0: {
                        prompt: "Outline the strategies for collecting data.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe the data analysis methods you will apply to interpret your results.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "How will you ensure the accuracy and reproducibility of your data?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    3: {
                        prompt: "What software or statistical tools will you use for analysis?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_2: {
                title: "Timeline and Milestones:",
                prompts: {
                    0: {
                        prompt: "Provide a timeline for the project with clear milestones for each stage (e.g., experimentation, data collection, manuscript writing, etc.).",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "What specific outcomes will indicate you have successfully completed each stage?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "How do you plan to adjust if your timeline deviates from the initial plan?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_2: {
        title: "Professional Development and Skills Enhancement",
        subsections: {
            subsection_0: {
                title: "Skills to Develop or Improve:",
                prompts: {
                    0: {
                        prompt: "Identify the technical, analytical, or research skills you aim to improve in the coming months.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Are there new techniques you intend to learn, or are there areas where you feel you need more practice?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Training or Workshops to Attend:",
                prompts: {
                    0: {
                        prompt: "Are there any workshops, conferences, or online courses that would help you develop essential skills for your project?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "What specific topics do you intend to focus on to further your personal and professional growth?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_2: {
                title: "Plan for Mentorship and Feedback:",
                prompts: {
                    0: {
                        prompt: "How often do you plan to meet with your supervisor and colleagues for feedback on your progress?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "What type of feedback do you expect to receive and how will you incorporate it into your work?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Do you intend to seek mentorship from other researchers in the lab or external sources to advance your knowledge?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_3: {
        title: "Research Ethics and Safety",
        subsections: {
            subsection_0: {
                title: "Adherence to Ethical Standards:",
                prompts: {
                    0: {
                        prompt: "Describe how you plan to maintain ethical standards in your research, such as ensuring data accuracy, proper citation practices, and integrity in collaboration.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "How will you handle any ethical dilemmas, such as authorship disputes or data manipulation?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Lab Safety Plan:",
                prompts: {
                    0: {
                        prompt: "Outline the specific lab safety protocols you will follow throughout your research (e.g., handling hazardous materials, equipment use).",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "What steps will you take to ensure safety in your daily activities, and how will you train yourself on new equipment or techniques?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_2: {
                title: "Environmental Considerations:",
                prompts: {
                    0: {
                        prompt: "Are there any environmental or safety concerns related to your research?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "How do you plan to mitigate them?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_4: {
        title: "Collaboration and Team Contribution",
        subsections: {
            subsection_0: {
                title: "Lab Duties and Group Contribution:",
                prompts: {
                    0: {
                        prompt: "Describe your responsibilities in the lab beyond your own research project (e.g., maintaining equipment, assisting others, organizing lab activities).",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "How do you plan to contribute to the lab’s success and team dynamics?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Team Communication and Collaboration:",
                prompts: {
                    0: {
                        prompt: "How do you plan to communicate effectively with your lab supervisor and colleagues about your progress and challenges?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "How will you contribute to lab meetings, group discussions, and collaborations with other researchers?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Do you have any specific strategies to improve your teamwork and collaborative efforts?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_5: {
        title: "Research Products and Outputs",
        subsections: {
            subsection_0: {
                title: "Research Papers and Publications:",
                prompts: {
                    0: {
                        prompt: "Describe any papers or publications you plan to contribute to, and outline the steps you will take toward their completion (e.g., data analysis, writing, submission).",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "How will you ensure the quality and impact of your publications?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "What is your timeline for submitting any research papers during this period?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Conference Presentations and Outreach Activities:",
                prompts: {
                    0: {
                        prompt: "Are you planning to present your research at any upcoming conferences?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "How will you prepare for these presentations, and what key messages will you communicate?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Will you engage in any outreach activities (e.g., public talks, school visits, community engagement) to share your research with non-specialists?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_6: {
        title: "Self-Improvement and Goal Reflection",
        subsections: {
            subsection_0: {
                title: "Self-Assessment and Reflection:",
                prompts: {
                    0: {
                        prompt: "Reflect on your strengths and weaknesses as a researcher.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "What specific improvements do you want to make in your research skills, work habits, or communication during this period?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Personal Goals for Growth:",
                prompts: {
                    0: {
                        prompt: "Set specific, measurable personal goals for your research and professional development.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "How will you actively seek feedback and ensure you address areas for improvement?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Are there specific personal or career milestones you hope to achieve by the end of this period?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_7: {
        title: "Potential Challenges and Risk Management",
        subsections: {
            subsection_0: {
                title: "Anticipated Research Challenges:",
                prompts: {
                    0: {
                        prompt: "Identify any potential obstacles you foresee in your research (e.g., technical difficulties, limited resources, unexpected results).",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "What strategies will you use to overcome these challenges or mitigate their impact?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Risk Management Plan:",
                prompts: {
                    0: {
                        prompt: "How will you manage risks related to safety, ethical dilemmas, or other factors?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Are there contingency plans in place to handle any unexpected issues?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_8: {
        title: "Timeline Overview",
        subsections: {
            subsection_0: {
                title: "Timeline for Research Plan:",
                prompts: {
                    0: {
                        prompt: "Provide an overview of the key stages of your research with expected start and end dates.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "How will you ensure that each milestone is achieved on schedule?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "What adjustments will you make if deadlines are missed or goals are delayed?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_9: {
        title: "Additional Comments",
        subsections: {
            subsection_0: {
                title: "Additional Comments:",
                prompts: {
                    0: {
                        prompt: "Is there anything else you would like to share about your research plan or any additional resources you need to succeed?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    }
};

//Flattens the form_layout
export function flattenPrompts(layout) {
    const prompts = [];

    Object.keys(layout).forEach((sectionKey) => {
        const section = layout[sectionKey];
        Object.keys(section.subsections).forEach((subsectionKey) => {
            const subsection = section.subsections[subsectionKey];
            Object.keys(subsection.prompts).forEach((promptKey) => {
                const promptObj = subsection.prompts[promptKey];
                prompts.push({
                    sectionKey: sectionKey,
                    subsectionKey: subsectionKey, 
                    promptKey: promptKey, 
                    sectionTitle: section.title,
                    subsectionTitle: subsection.title,
                    ...promptObj, // Spread other prompt details
                });
            });
        });
    });

    return prompts;
}

//Function to create form
export function createForm(prompts, html_el) {

    for (let i = 0; i < prompts.length; i++) {

        //Create title and subtitle
        if (i == 0) {
            const sectionTitle = document.createElement("h2");
            sectionTitle.textContent = prompts[i].sectionTitle;
            html_el.appendChild(sectionTitle);

            const subsectionTitle = document.createElement("h3");
            subsectionTitle.textContent = prompts[i].subsectionTitle;
            html_el.appendChild(subsectionTitle);
        }else if (i > 0 && prompts[i].sectionTitle != prompts[i - 1].sectionTitle) {
            const sectionTitle = document.createElement("h2");
            sectionTitle.textContent = prompts[i].sectionTitle;
            html_el.appendChild(sectionTitle);

            const subsectionTitle = document.createElement("h3");
            subsectionTitle.textContent = prompts[i].subsectionTitle;
            html_el.appendChild(subsectionTitle);
        }else if (i > 0 && prompts[i].subsectionTitle != prompts[i - 1].subsectionTitle) {
            const subsectionTitle = document.createElement("h3");
            subsectionTitle.textContent = prompts[i].subsectionTitle;
            html_el.appendChild(subsectionTitle);        
        }

        //Handle textarea input types
        if (prompts[i].type_of_inputs == 'textarea') {
            const prompt = document.createElement("h5");
            prompt.textContent = prompts[i].prompt;

            const textarea = document.createElement('textarea'); //Create textarea
            textarea.rows = prompts[i].row; // Set the number of rows
            textarea.cols = prompts[i].col; // Set the number of columns

            // Get keys for prompt
            const sectionKey = prompts[i].sectionKey.slice(-1)
            const subsectionKey = prompts[i].subsectionKey.slice(-1)
            const promptKey = prompts[i].promptKey

            textarea.id =  `${sectionKey}.${subsectionKey}.${promptKey}`// Set input id
            html_el.appendChild(prompt);
            html_el.appendChild(textarea);
        }
    }

    //Create submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'submitButton';
    submitButton.textContent = 'Submit';
    html_el.appendChild(submitButton);
}