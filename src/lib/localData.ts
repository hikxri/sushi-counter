import type { DataType } from "../contexts/DataContext";

export function setLocalData(data: DataType[]) {
  localStorage.setItem("sushi-data", JSON.stringify(data));
}

export function getLocalData() {
  return JSON.parse(localStorage.getItem("sushi-data") || "[]");
}