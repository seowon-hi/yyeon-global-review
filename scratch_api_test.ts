import handler from "./api/chat";

function mockRes() {
  const res: any = {
    _status: 200,
    _body: null,
    status(code: number) {
      this._status = code;
      return this;
    },
    json(body: any) {
      this._body = body;
      return this;
    },
  };
  return res;
}

async function run() {
  // 1) valid POST, product question
  const res1 = mockRes();
  await handler(
    { method: "POST", body: { message: "오브백 무게가 얼마나 되나요?", history: [], lang: "KO" } } as any,
    res1,
  );
  console.log("POST product question ->", res1._status, JSON.stringify(res1._body));

  // 2) valid POST, no category matched
  const res2 = mockRes();
  await handler(
    { method: "POST", body: { message: "안녕하세요!", history: [], lang: "KO" } } as any,
    res2,
  );
  console.log("POST greeting ->", res2._status, JSON.stringify(res2._body));

  // 3) wrong method
  const res3 = mockRes();
  await handler({ method: "GET", body: {} } as any, res3);
  console.log("GET (should be 405) ->", res3._status, JSON.stringify(res3._body));
}

run();
