"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { preprocessMentions } from "@/src/lib/transcript/preprocessMentions";

interface Props {
  content: string;
}

function parseSpoilers(text: string) {
  return text.replace(
    /\|\|(.+?)\|\|/g,
    '<span class="discord-spoiler">$1</span>'
  );
}

export function DiscordTextParser({ content }: Props) {
  const processedContent = parseSpoilers(
    preprocessMentions(content)
  );

  return (
    <div className="prose prose-invert max-w-none text-gray-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children } = props;

            return (
              <code className="bg-black/60 px-1 py-0.5 rounded text-sm">
                {children}
              </code>
            );
          },

          pre(props) {
            return (
              <pre className="bg-[#1e1f22] border border-gray-800 rounded p-3 overflow-x-auto">
                {props.children}
              </pre>
            );
          },

          blockquote(props) {
            return (
              <blockquote className="border-l-4 border-gray-500 pl-4 text-gray-400">
                {props.children}
              </blockquote>
            );
          },

          a(props) {
            return (
              <a
                href={props.href}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                {props.children}
              </a>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
