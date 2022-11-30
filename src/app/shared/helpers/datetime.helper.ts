export const formatTime = (time: number) => {
  const h = Math.floor(time / 3600);
  const m = Math.floor(time / 60) % 60;
  const s = time % 60;
  return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
};

export const parseTime = (time: string) => {
  return time.split(':')
    .reduce((prev, item, i) => prev * 60 + Number(item), 0);
}
