/** @jsx jsx */
/** @jsxImportSource npm:hono/jsx */
import { Hono, Context } from "npm:hono";
import { css, cx, keyframes, Style } from "npm:hono/css";
import { renderToReadableStream } from "npm:hono/jsx/streaming";
import { totalResult } from "./totalCalc.ts";

const parentKeys = Object.keys(totalResult.parent);
const parentObject: any = {};
parentKeys.forEach((i) => {
  Object.keys(totalResult.parent[i]).forEach((ii) => {
    if (!parentObject[ii]) parentObject[ii] = {};
    if (ii.startsWith("20")) parentObject[ii][i] = totalResult.parent[i][ii];
    if (ii.startsWith("25")) parentObject[ii][i] = totalResult.parent[i][ii];
    if (ii.startsWith("30")) parentObject[ii][i] = totalResult.parent[i][ii];
    if (ii.startsWith("40")) parentObject[ii][i] = totalResult.parent[i][ii];
    if (ii.startsWith("50")) parentObject[ii][i] = totalResult.parent[i][ii];
    if (ii.startsWith("60")) parentObject[ii][i] = totalResult.parent[i][ii];
    if (ii.startsWith("70")) parentObject[ii][i] = totalResult.parent[i][ii];
    if (ii.startsWith("80")) parentObject[ii][i] = totalResult.parent[i][ii];
    if (ii.startsWith("90")) parentObject[ii][i] = totalResult.parent[i][ii];
    if (ii.startsWith("100")) parentObject[ii][i] = totalResult.parent[i][ii];
    if (ii.startsWith("110")) parentObject[ii][i] = totalResult.parent[i][ii];
  });
});
const childKeys = Object.keys(totalResult.children);
const childObject: any = {};
childKeys.forEach((i) => {
  Object.keys(totalResult.parent[i]).forEach((ii) => {
    if (!childObject[ii]) childObject[ii] = {};
    if (ii.startsWith("20")) childObject[ii][i] = totalResult.children[i][ii];
    if (ii.startsWith("25")) childObject[ii][i] = totalResult.children[i][ii];
    if (ii.startsWith("30")) childObject[ii][i] = totalResult.children[i][ii];
    if (ii.startsWith("40")) childObject[ii][i] = totalResult.children[i][ii];
    if (ii.startsWith("50")) childObject[ii][i] = totalResult.children[i][ii];
    if (ii.startsWith("60")) childObject[ii][i] = totalResult.children[i][ii];
    if (ii.startsWith("70")) childObject[ii][i] = totalResult.children[i][ii];
    if (ii.startsWith("80")) childObject[ii][i] = totalResult.children[i][ii];
    if (ii.startsWith("90")) childObject[ii][i] = totalResult.children[i][ii];
    if (ii.startsWith("100")) childObject[ii][i] = totalResult.children[i][ii];
    if (ii.startsWith("110")) childObject[ii][i] = totalResult.children[i][ii];
  });
});

const app = new Hono();

app.get("/", (c: Context) => {
  const stream: ReadableStream<Uint8Array> = renderToReadableStream(
    <html>
      <head>
        <Style>{css`
          body {
            font-family: monospace;
          }
          .container {
            margin: 0 auto;
            padding: 0;
            box-sizing: border-box;
            background-color: rgba(255, 255, 255, 0.7);
          }
          .border {
            border-collapse: collapse;
            border: 1px solid #333;
          }
          th,
          td {
            width: 60px;
            height: 60px;
            text-align: center;
          }
          th {
            background-color: #ff525f;
            font-weight: bold;
            font-size: 16px;
          }
          td {
            background-color: #fffffb;
            font-weight: normal;
            font-size: 16px;
          }
          p {
            line-height: 0.9;
          }
          .pickup {
            height: 30px;
            vertical-align: middle;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(126, 138, 248);
          }
          .drawn {
            height: 30px;
            vertical-align: middle;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(252, 228, 125);
          }
        `}</Style>
      </head>
      <body>
        <div>
          <h1>親の得点表</h1>
          <table class="border" border={1}>
            <thead>
              {[...Array(parentKeys.length + 1)].map((_i, n) => (
                <th>{n === 0 ? "" : parentKeys[n - 1]}</th>
              ))}
            </thead>
            <tbody>
              {Object.keys(parentObject).map((i) => (
                <tr>
                  {[...Array(Object.keys(parentObject[i]).length + 1)].map(
                    (_i, n) =>
                      n === 0 ? (
                        <th>{i}</th>
                      ) : (
                        <td>
                          <div class="pickup">
                            {
                              parentObject[i][
                                Object.keys(parentObject[i])[n - 1]
                              ].pickup
                            }
                          </div>
                          <div class="drawn">
                            <p>
                              {`${
                                parentObject[i][
                                  Object.keys(parentObject[i])[n - 1]
                                ].drawn.split("(")[0]
                              }\n(${
                                parentObject[i][
                                  Object.keys(parentObject[i])[n - 1]
                                ].drawn.split("(")[1]
                              }`}
                            </p>
                          </div>
                        </td>
                      )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h1>子の得点表</h1>
          <table class="border" border={1}>
            <thead>
              {[...Array(childKeys.length + 1)].map((_i, n) => (
                <th>{n === 0 ? "" : childKeys[n - 1]}</th>
              ))}
            </thead>
            <tbody>
              {Object.keys(childObject).map((i) => (
                <tr>
                  {[...Array(Object.keys(childObject[i]).length + 1)].map(
                    (_i, n) =>
                      n === 0 ? (
                        <th>{i}</th>
                      ) : (
                        <td>
                          <div class="pickup">
                            {
                              childObject[i][Object.keys(childObject[i])[n - 1]]
                                .pickup
                            }
                          </div>
                          <div class="drawn">
                            <p>
                              {`${
                                childObject[i][
                                  Object.keys(childObject[i])[n - 1]
                                ].drawn.split("(")[0]
                              }\n(${
                                childObject[i][
                                  Object.keys(childObject[i])[n - 1]
                                ].drawn.split("(")[1]
                              }`}
                            </p>
                          </div>
                        </td>
                      )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  );

  return c.body(stream, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Transfer-Encoding": "chunked",
    },
  });
});

Deno.serve(app.fetch);
