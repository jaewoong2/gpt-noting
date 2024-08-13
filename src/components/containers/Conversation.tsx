"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

const queryFn = (number: number) =>
  fetch("https://jsonplaceholder.typicode.com/todos/" + `${number}`).then(
    (res) => res.json()
  );

const mutateFn = () =>
  fetch("https://jsonplaceholder.typicode.com/posts/", { method: "POST" }).then(
    (res) => res.json()
  );

const Conversation = () => {
  const [number, setNumber] = useState(1);

  const { mutate } = useMutation({
    mutationFn: mutateFn,
    onSuccess: () => {
      alert("로그인 성공했습니다");
    },
  });

  const { data, isSuccess } = useQuery({
    queryFn: () => queryFn(number),
    queryKey: [`fetch/todos/1`],
  });

  useEffect(() => {
    if (number === 100) return;
    if (isSuccess) {
      setNumber((prev) => prev + 1);
    }
  }, [isSuccess, data, number]);

  return (
    <div>
      <button onClick={() => mutate()}>클릭하면 뮤테이션 함수 실행</button>
    </div>
  );
};

export default Conversation;
