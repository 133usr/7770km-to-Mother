package seraph.GJLeague.scoreBoard;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;
import android.widget.ImageView;
import android.widget.Toast;

import com.andrognito.patternlockview.PatternLockView;
import com.andrognito.patternlockview.listener.PatternLockViewListener;
import com.andrognito.patternlockview.utils.PatternLockUtils;

import java.util.List;

import io.paperdb.Paper;

public class LockScreen_pattern extends AppCompatActivity {
    private ImageView profileimage;
    private PatternLockView mPatternLockView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lock_screen_pattern);
        profileimage = findViewById(R.id.profile_image);
        int randomImage = randomGenerator(4);
        if(randomImage==1)
            profileimage.setImageResource(R.drawable.flight);
        else if (randomImage ==2)
            profileimage.setImageResource(R.drawable.flight1);
        else if (randomImage ==3)
            profileimage.setImageResource(R.drawable.flight2);
        else if (randomImage ==0)
            profileimage.setImageResource(R.drawable.flight);
        else if (randomImage ==4)
            profileimage.setImageResource(R.drawable.flight2);
        mPatternLockView = (PatternLockView) findViewById(R.id.patter_lock_view);
        mPatternLockView.addPatternLockListener(mPatternLockViewListener);

    }
    public int randomGenerator(int max ){

        return (int)(Math.random()*(max-1+1)+1);
    }



    private PatternLockViewListener mPatternLockViewListener = new PatternLockViewListener() {
        @Override
        public void onStarted() {
            Log.d(getClass().getName(), "Pattern drawing started");
        }

        @Override
        public void onProgress(List<PatternLockView.Dot> progressPattern) {
            Log.d(getClass().getName(), "Pattern progress: " +
                    PatternLockUtils.patternToString(mPatternLockView, progressPattern));
        }

        @Override
        public void onComplete(List<PatternLockView.Dot> pattern) {
            Log.d(getClass().getName(), "Pattern complete: " +
                    PatternLockUtils.patternToString(mPatternLockView, pattern));

            // Convert the pattern to a string for comparison
            String patternString = PatternLockUtils.patternToString(mPatternLockView, pattern);
            Paper.init(getApplicationContext());

            if (patternString.equals("1475")) {
                Paper.book().write("church","adajan");
                startMain();
            }
            else if (patternString.equals("1478")) {
                Paper.book().write("church","jashoda");
                startMain();
            }
            else if (patternString.equals("2467")) {
                Paper.book().write("church","dindoli");
                startMain();
            }
            else if (patternString.equals("5436")) {
                Paper.book().write("church","vyara");
                startMain();
            }
            else if (patternString.equals("43678")) {
                Paper.book().write("church","vadodara");
                startMain();
            }
            else if (patternString.equals("2147")) {
                Paper.book().write("church","rajkot");
                startMain();
            }
            else if (patternString.equals("3642")) {
                Paper.book().write("church","naroda");
                startMain();
            }



            else {
                Vibrator vibe = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);

                // Vibrate pattern: { delay, vibrate, pause, vibrate, pause, vibrate }
                long[] vibepattern = {0, 50, 100, 50, 100,50}; // Adjust timings as needed

                if (vibe.hasVibrator()) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        vibe.vibrate(VibrationEffect.createWaveform(vibepattern, -1));
                    }else {
                        vibe.vibrate(200);
                    }
                }
                Toast.makeText(LockScreen_pattern.this, "Wrong Pattern", Toast.LENGTH_SHORT).show();
                mPatternLockView.clearPattern();
            }
            mPatternLockView.clearPattern();
        }

        public void startMain(){
            Intent openMainActivity = new Intent(getApplicationContext(), MainActivity.class);
            openMainActivity.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            startActivity(openMainActivity);
        }

        @Override
        public void onCleared() {
            Log.d(getClass().getName(), "Pattern has been cleared");
        }
    };
}