import CreatorCard from '../components/CreatorCard';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  creators: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 100,
  }
})

function Creators () {
  const classes = useStyles();

  return (
    <>
      <div className={classes.creators}>
        <CreatorCard
            name={'Abid Ramay'}
            photo={'/Abid.jpg'}
            github={'https://github.com/aramay'}
            linkedIn={'https://www.linkedin.com/in/aramay/'}
          >
        </CreatorCard>
        <CreatorCard
            name={'Blake Myrick'}
            photo={'/Blake.png'}
            github={'https://github.com/bamche'}
            linkedIn={'https://www.linkedin.com/in/blake-myrick/'}
          >
        </CreatorCard>      
        <CreatorCard
            name={'Emily Tschida'}
            photo={'/Emily.jpg'}
            github={'https://github.com/thetschida'}
            linkedIn={'https://www.linkedin.com/in/emily-tschida-1b24a1222/'}
          >
        </CreatorCard>
        <CreatorCard
            name={'Dan Yeoman'}
            photo={'/Dan.jpg'}
            github={'https://github.com/dyeoman2'}
            linkedIn={'https://www.linkedin.com/in/dyeoman/'}
          >
        </CreatorCard>
      </div>
    </>
  )
}

export default Creators;