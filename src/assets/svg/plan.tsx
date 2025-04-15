interface Props {
  className?: string;
}
const PlanIcon = ({ className }: Props) => {
  return (
    <svg
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <rect
        x='0.5'
        y='0.5'
        width='39'
        height='39'
        rx='19.5'
        fill='url(#paint0_linear_1_119)'
      />
      <rect
        x='0.5'
        y='0.5'
        width='39'
        height='39'
        rx='19.5'
        stroke='url(#paint1_linear_1_119)'
      />
      <path
        opacity='0.6'
        d='M21.6667 23.3333C21.6667 24.8083 21.025 26.1417 20 27.05C19.1167 27.85 17.95 28.3333 16.6667 28.3333C13.9083 28.3333 11.6667 26.0917 11.6667 23.3333C11.6667 21.0333 13.2333 19.0833 15.35 18.5083C15.925 19.9583 17.1583 21.075 18.6833 21.4917C19.1 21.6083 19.5417 21.6667 20 21.6667C20.4583 21.6667 20.9 21.6083 21.3167 21.4917C21.5417 22.0583 21.6667 22.6833 21.6667 23.3333Z'
        fill='black'
      />
      <path
        d='M25 16.6667C25 17.3167 24.875 17.9417 24.65 18.5083C24.075 19.9583 22.8417 21.075 21.3167 21.4917C20.9 21.6083 20.4583 21.6667 20 21.6667C19.5417 21.6667 19.1 21.6083 18.6833 21.4917C17.1583 21.075 15.925 19.9583 15.35 18.5083C15.125 17.9417 15 17.3167 15 16.6667C15 13.9083 17.2417 11.6667 20 11.6667C22.7583 11.6667 25 13.9083 25 16.6667Z'
        fill='black'
      />
      <path
        opacity='0.4'
        d='M28.3333 23.3333C28.3333 26.0917 26.0917 28.3333 23.3333 28.3333C22.05 28.3333 20.8833 27.85 20 27.05C21.025 26.1417 21.6667 24.8083 21.6667 23.3333C21.6667 22.6833 21.5417 22.0583 21.3167 21.4917C22.8417 21.075 24.075 19.9583 24.65 18.5083C26.7667 19.0833 28.3333 21.0333 28.3333 23.3333Z'
        fill='black'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1_119'
          x1='20'
          y1='0'
          x2='20'
          y2='40'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='white' />
          <stop offset='1' stop-color='#CDCDCD' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_1_119'
          x1='20'
          y1='0'
          x2='20'
          y2='40'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-opacity='0' />
          <stop offset='1' stop-opacity='0.24' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PlanIcon;
