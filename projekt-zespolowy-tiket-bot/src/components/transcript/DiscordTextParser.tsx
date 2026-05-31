"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Spoiler } from "./Spoiler";
import { preprocessMentions } from "@/src/lib/transcript/preprocessMentions";

interface Props {
  content: string;
}

function splitSpoilers(text: string) {
  const regex = /\|\|(.*?)\|\|/g;

  const result: (string | { spoiler: string })[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }

    result.push({ spoiler: match[1] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}

export function MarkdownWithSpoilers({ content }: Props) {
  const processedContent = preprocessMentions(content);
  const parts = splitSpoilers(processedContent);

  return (
    <div className="prose prose-invert max-w-none text-gray-200">
      {parts.map((part, index) => {
        if (typeof part === "string") {
          return (
            <ReactMarkdown
              key={index}
              remarkPlugins={[remarkGfm]}
              components={{
                code({ children }) {
                  return (
                    <code className="bg-black/60 px-1 py-0.5 rounded text-sm">
                      {children}
                    </code>
                  );
                },

                pre({ children }) {
                  return (
                    <pre className="bg-[#1e1f22] border border-gray-800 rounded p-3 overflow-x-auto">
                      {children}
                    </pre>
                  );
                },

                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-4 border-gray-500 pl-4 text-gray-400">
                      {children}
                    </blockquote>
                  );
                },

                a({ href, children }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {part}
            </ReactMarkdown>
          );
        }

        return <Spoiler key={index} text={part.spoiler} />;
      })}
    </div>
  );
}
