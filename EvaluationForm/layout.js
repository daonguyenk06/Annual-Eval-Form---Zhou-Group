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
export let evaluation_form_layout = {
    section_0: {
        title: "Technical Competence (Weight: 10 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List the experiments, techniques and equipment you have successfully worked with.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Highlight any new techniques you have mastered during this period.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Identify specific achievements or experiments where your technical skills were demonstrated.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "List any techniques or equipment you struggled with or found challenging.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe any areas where you were unable to meet expectations or had difficulty performing tasks effectively.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Are there specific skills you still need to improve?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    3: {
                        prompt: "Did you have struggles with recording your notebook as expected?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_1: {
        title: "Data Analysis & Interpretation (Weight: 10 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List any data analysis methods you applied successfully to your research.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Highlight examples of when your interpretation of data led to key insights or outcomes.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Describe any positive outcomes from using these methods (e.g., clearer results, improved reproducibility, any research products).",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Describe any challenges you faced with data analysis or interpreting results.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Were there times when your data analysis led to incorrect conclusions or confusion?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Did you face any difficulties understanding statistical methods or analysis software?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_2: {
        title: "Innovation & Intellectual Contribution (Weight: 10 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List any innovative approaches or ideas you have introduced to the project.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe instances where your creativity or problem-solving skills led to progress in the research.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Highlight any new concepts or solutions you contributed to the research discussions.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there times when your ideas or contributions were not as impactful as you hoped?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you struggle to generate new ideas or feel that your contributions were limited?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there missed opportunities for applying innovative thinking?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_3: {
        title: "Attitude & Initiative (Weight: 10 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List examples of when you took initiative and showed proactivity in your work.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe situations where you demonstrated a positive attitude toward your research and tasks.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Highlight any instances where you went above and beyond expectations in your role.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there instances where you waited for instructions or lacked initiative?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you experience times when your attitude or approach was less than optimal?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there periods when you struggled to stay motivated or engaged with your work?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_4: {
        title: "Responsiveness & Timely Communication (Weight: 10 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List examples of when you effectively communicated research progress or challenges to your supervisor or team.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe (in general) any timely responses you provided to emails, slacks, meeting requests, or project updates.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Highlight instances where your communication helped resolve an issue or move the project forward.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there times when you were slow to respond to communication or missed important updates?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you ever fail to communicate challenges in a timely manner?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there instances where miscommunication or lack of updates caused delays?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },    
    section_5: {
        title: "Conflict Handling (Weight: 5 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List examples of when you resolved conflicts effectively in the lab.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe times when you managed disagreements in a constructive manner, leading to a positive outcome.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there instances when you helped mediate conflicts or ensured smooth teamwork?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there situations where you struggled to resolve conflicts or disagreements?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you contribute to any tension or misunderstandings in the team?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there any unresolved issues or conflicts that negatively impacted your work or the team?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_6: {
        title: "Adherence to Research Ethics (Weight: 10 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List instances where you demonstrated strong adherence to ethical standards (e.g., accurate data recording, proper citation).",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Highlight any times when you took extra care to ensure ethical considerations in your research.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there examples where your ethical decision-making helped maintain the integrity of the project?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there any situations where you felt unsure about the ethical implications of your actions?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you experience any moments where your ethical conduct could have been improved?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Have you encountered any dilemmas regarding authorship or data management?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_7: {
        title: "Lab Safety (Weight: 10 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List actions you took to ensure your safety and the safety of others in the lab.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe instances where you followed safety protocols effectively.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Did you help enforce safety measures or educate others on safety procedures?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there any safety incidents or near-misses in which you were involved?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you ever neglect safety procedures, either intentionally or unintentionally?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there times when you failed to report safety hazards or follow the required protocols?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_8: {
        title: "Fulfillment of Lab Duties (Weight: 10 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List your contributions to maintaining the lab (e.g., equipment maintenance, organizing lab space).",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe your efforts to ensure the smooth operation of daily lab activities.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Did you take responsibility for specific lab duties and carry them out consistently?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there times when you neglected lab duties or did not meet expectations for lab upkeep?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you fail to follow through on assigned tasks or take longer than expected to complete them?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there instances when your contributions to the lab environment were insufficient?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_9: {
        title: "Collaboration & Teamwork (Weight: 5 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List examples of successful teamwork or collaborative efforts in the lab.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe situations where you worked effectively with others and contributed to team success.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were you proactive in offering help to colleagues or contributing to group tasks?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there times when you struggled to collaborate effectively with the team?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you experience any issues with communication or coordination within the group?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there moments when your teamwork or contributions were minimal or unproductive?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_10: {
        title: "Research Papers (Weight: 5 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List any research papers you contributed to, and describe your role in each.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Highlight the progress of the papers (draft, submitted, accepted, etc.).",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were you involved in any manuscript revisions or responses to reviewer feedback?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there any papers or publications that you struggled to contribute to?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you miss deadlines related to publications or not fully meet expectations for writing?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there any papers that were delayed or not submitted due to lack of progress?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_11: {
        title: "Conference Presentations (Weight: 5 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List the conferences where you presented your research and describe the outcome (e.g., positive feedback, networking).",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Were you able to effectively communicate your research at these conferences?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Did you receive any valuable feedback that helped refine your research or presentation skills?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there any challenges during your presentations, such as technical difficulties or lack of preparation?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you experience any difficulty conveying your research to the audience?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there missed opportunities to present your work at relevant conferences?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_12: {
        title: "Research Talks and Outreach Activities (Weight: 5 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List any outreach activities or public talks you participated in.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe how you communicated complex scientific ideas to non-specialist audiences.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Did you engage with the community or promote science to a broader public?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                },
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there any outreach activities that you did not participate in, despite opportunities?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you face challenges in presenting to non-expert audiences, such as difficulty simplifying concepts?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there times when your outreach efforts were not as effective as anticipated?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_13: {
        title: "Self-Improvement Efforts (Weight: 5 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List any courses, workshops, or resources you used to improve your skills or knowledge.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe how you applied the skills or knowledge gained to your research.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were you proactive in seeking opportunities for self-improvement?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                },
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there areas where you did not actively seek improvement?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you neglect opportunities to build on your skills or knowledge?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there times when you failed to address weaknesses in your skillset?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },    
    section_14: {
        title: "Response to Feedback (Weight: 5 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List specific feedback you received and how you acted upon it.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe improvements you made based on constructive criticism.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were you open to feedback and made an effort to improve?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                },
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there times when you did not act upon feedback or overlooked suggestions for improvement?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you resist feedback or fail to incorporate it into your work?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there areas where feedback was not fully addressed or implemented?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },   
    section_15: {
        title: "Data Analysis and Presentation in Meetings (Weight: 5 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "Were your data presentations clear, organized, and easy to follow?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you provide detailed analysis and answers to questions raised during meetings?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were you able to effectively explain complex data to your team or supervisor?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Did you struggle to present your data clearly or to address questions from colleagues?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Were there times when your data presentation lacked depth or clarity?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Did you encounter challenges with organizing or explaining your data during meetings?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_16: {
        title: "Critical Thinking and Active Participation in Discussions (Weight: 5 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "Did you actively contribute to discussions with constructive feedback or new ideas?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Were you able to critically assess the research and suggest potential improvements?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were your contributions recognized by the team as valuable and insightful?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there times when you were passive during meetings or failed to contribute actively?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you struggle to offer critical insights or suggestions for improving the research?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there moments when you failed to engage in discussions or consider alternative viewpoints?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_17: {
        title: "Lab Incidents or Challenges (Weight: 5 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "List any incidents where you responded effectively or resolved issues quickly.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you take responsibility for any incidents and actively work toward a solution?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were you able to prevent incidents from recurring?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there any incidents or challenges that negatively affected your work or project timeline?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you fail to respond to challenges in a timely or appropriate manner?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there mistakes or accidents in the lab that could have been avoided?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_18: {
        title: "Resolution and Learning from Challenges (Weight: 5 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "Describe how you addressed challenges and what you learned from the experience.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Were you able to apply lessons learned to improve your work or prevent similar issues?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Did you contribute to improving lab practices after resolving an incident?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Were there times when you struggled to resolve challenges or failed to learn from them?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Did you miss opportunities to reflect on mistakes or improve processes?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Were there recurring issues that were not addressed effectively?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_19: {
        title: "Overall Assessment (Weight: 5 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "Summarize your achievements and contributions in this evaluation period.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Identify the areas where you performed exceptionally well.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Highlight any areas where you believe you could have performed better.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Identify specific weaknesses or missed opportunities during this period.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_20: {
        title: "Future Goals (Weight: 5 points):",
        subsections: {
            subsection_0: {
                title: "Positive Aspects:",
                prompts: {
                    0: {
                        prompt: "Describe your plan for improving your performance in the next evaluation period.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Identify specific skills or areas where you aim to grow and develop.",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Negative Aspects:",
                prompts: {
                    0: {
                        prompt: "Are there any areas you feel uncertain about addressing in the future?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Are there recurring challenges you anticipate facing, and how do you plan to overcome them?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    },
    section_21: {
        title: "Additional Comments (Weight: 0 points):",
        subsections: {
            subsection_0: {
                title: "Additional Comments",
                prompts: {
                    0: {
                        prompt: "Is there anything else you would like to share about your experience in the lab or any feedback you have for the lab or your supervisor?",
                        type_of_inputs: inputTypes.longText,
                        row: 5,
                        col: 80
                    }
                }
            }
            
        }
        
    }
}

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

        // Get keys for prompt
        const sectionKey = prompts[i].sectionKey.slice(-1)
        const subsectionKey = prompts[i].subsectionKey.slice(-1)
        const promptKey = prompts[i].promptKey

        //Create title and subtitle
        if (i == 0) {
            const sectionTitle = document.createElement("h2");
            sectionTitle.textContent = prompts[i].sectionTitle;
            sectionTitle.id = prompts[i].sectionKey;
            html_el.appendChild(sectionTitle);

            const subsectionTitle = document.createElement("h3");
            subsectionTitle.textContent = prompts[i].subsectionTitle;
            subsectionTitle.id = `_${sectionKey}.${subsectionKey}`;;
            html_el.appendChild(subsectionTitle);

        }else if (i > 0 && prompts[i].sectionTitle != prompts[i - 1].sectionTitle) {
            const sectionTitle = document.createElement("h2");
            sectionTitle.textContent = prompts[i].sectionTitle;
            sectionTitle.id = prompts[i].sectionKey;
            html_el.appendChild(sectionTitle);

            const subsectionTitle = document.createElement("h3");
            subsectionTitle.textContent = prompts[i].subsectionTitle;
            subsectionTitle.id = `_${sectionKey}.${subsectionKey}`;;
            html_el.appendChild(subsectionTitle);
            
        }else if (i > 0 && prompts[i].subsectionTitle != prompts[i - 1].subsectionTitle) {
            const subsectionTitle = document.createElement("h3");
            subsectionTitle.textContent = prompts[i].subsectionTitle;
            subsectionTitle.id = `_${sectionKey}.${subsectionKey}`;;
            html_el.appendChild(subsectionTitle);        
        }

        //Handle textarea input types
        if (prompts[i].type_of_inputs == inputTypes.longText) {
            //Create prompt
            const prompt = document.createElement("h5");
            prompt.textContent = prompts[i].prompt;
            prompt.id = `prompt_${sectionKey}.${subsectionKey}.${promptKey}`;

            //Create textarea
            const textarea = document.createElement('textarea');
            textarea.rows = prompts[i].row;
            textarea.cols = prompts[i].col;
            textarea.id =  `input_${sectionKey}.${subsectionKey}.${promptKey}`

            html_el.appendChild(prompt);
            html_el.appendChild(textarea);

        }else {
            console.warn(`Unknown input type: ${prompts[i].type_of_inputs}`);
        }
    }

    //Create submit button
    const submitButton = document.createElement('button');
    submitButton.id = 'submitButton';
    submitButton.textContent = 'Submit';
    html_el.appendChild(submitButton);
}