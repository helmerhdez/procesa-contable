namespace Data
{
    public class DataBase
    {
        public Object Result = false;
        public String Exception = String.Empty;
        public Boolean IsOk = false;

        public Boolean Execute()
        {
            try
            {
                Procces();
                IsOk = true;
            }
            catch (Exception exception)
            {
                Exception = exception.ToString();
            }

            return IsOk;
        }

        public virtual void Procces() { }

        public void SetResult(Object value)
        {
            Result = value;
            IsOk = true;
        }

        public void SetValidation(String value)
        {
            Exception = value;
        }
    }
}
