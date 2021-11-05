import './personCard.css'
import { format } from 'date-fns'
import MailIcon from '@/assets/images/mail.svg'
import RegDateIcon from '@/assets/images/regdate.svg'
import PersonIcon from '@/assets/images/person.svg'

export default ({ props }) => {
  const { person } = props
  const formattedDate = format(new Date(props.person.registered), 'dd.MM.yyyy')
  return (
    <div class="person">
      <div class="person__photo">
        <img src={person.picture} alt="photo" />
      </div>
      <div class="person__info">
        <div class="person__info-main">
          <div class="person__info-name">
            <b>{`${person.name} (${person.age})`}</b>
          </div>
          <div class="person__info-department">
            <b>{person.department}</b>
          </div>
        </div>

        <div class="person__info-item">
          <MailIcon class="person__info-icon" />
          {person.email}
        </div>
        <div class="person__info-item">
          <RegDateIcon class="person__info-icon" />
          {formattedDate}
        </div>
        <div class="person__info-item person__info-about">
          <PersonIcon class="person__info-icon" />
          {person.about}
        </div>
      </div>
    </div>
  )
}
