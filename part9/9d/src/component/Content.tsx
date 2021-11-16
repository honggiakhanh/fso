import React from "react";
import { CoursePart } from "../App";

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  switch (props.part.type) {
    case "normal":
      return (
        <div>
          <strong>
            {props.part.name} {props.part.exerciseCount}
          </strong>
          <div>{props.part.description}</div>
          <br />
        </div>
      );
      break;
    case "groupProject":
      return (
        <div>
          <strong>
            {props.part.name} {props.part.exerciseCount}
          </strong>
          <div>Project exercises {props.part.groupProjectCount}</div>
          <br />
        </div>
      );
      break;
    case "submission":
      return (
        <div>
          <strong>
            {props.part.name} {props.part.exerciseCount}
          </strong>
          <div>{props.part.description}</div>
          <div>Submit to {props.part.exerciseSubmissionLink}</div>
          <br />
        </div>
      );
      break;
    case "special":
      return (
        <div>
          <strong>
            {props.part.name} {props.part.exerciseCount}
          </strong>
          <div>{props.part.description}</div>
          <div>
            Required skills:{" "}
            {props.part.requirements.map((skill) => (
              <> {skill},</>
            ))}
          </div>
          <br />
        </div>
      );
      break;
  }
};

interface CoursePartProps {
  courseParts: CoursePart[];
}
const Content = (props: CoursePartProps) => {
  return (
    <div>
      {props.courseParts.map((part) => {
        return <Part key={part.name} part={part} />;
      })}
    </div>
  );
};

export default Content;
